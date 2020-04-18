import sketch from 'sketch';
import Sketch from 'sketch/dom';
import Settings from 'sketch/settings';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import {getWebview} from 'sketch-module-web-view/remote';
import { getFullArtboardList, DrawArtboardsRows } from "./lib/arrangeArtboards";
const SymbolMaster = Sketch.SymbolMaster


const Group = Sketch.Group;
const Document = Sketch.Document;
const Rectangle = Sketch.Rectangle;
const ShapePath = Sketch.ShapePath;
const Text = Sketch.Text;
const Artboard = Sketch.Artboard;
const Page = Sketch.Page;
const document = Document.getSelectedDocument();
const selectedPage = document.selectedPage;

var doc = sketch.getSelectedDocument();
var selection = doc.selectedLayers;
var prefixStringChange = false;
var symbolStringChange = false;
var settingData = {};

const settingFlowKey = "settingFlowKey";
const iconSize = 16;
const iconDist = 32;
const horizontalGutter = 100;
const verticalGutter = 30;
var checkboxVisible = true;
var prefixArr = [];


var symbolsPage = "";
var iconsPage = "";

const doIconSymbol = (symbolstring,name,i) =>{//doIconSymbol
    var newArtboard = new Artboard({
        name: name,
        frame:{
            x:i*(1024+iconDist),
            y:0,
            width:1024,
            height:1024
        }
    })

    var group = sketch.createLayerFromData(symbolstring, 'svg');
    group.name = name;
    group.frame.x= (newArtboard.frame.width-group.frame.width)/2
    group.frame.y= (newArtboard.frame.height-group.frame.height)/2
    group.parent = newArtboard;

    var master = SymbolMaster.fromArtboard(newArtboard)

    master.parent = iconsPage;
    
    doSize(master,i,name);
};

const checkIcon = (name) => {
    var icons = symbolsPage.layers || [];
    for(var i=0;i<icons.length;i++){
      if(icons[i].layers[0].name === name){
        return true
      }
    }
    return false
};

const doSize = (master,i,name) => {
    var prefixName = getPrefix(name);
    var newArtboard = new Artboard({
        name: prefixName ? (prefixName+"/"+name):name,
        frame:{
            x:i*(iconSize+iconDist),
            y:0,
            width:iconSize,
            height:iconSize
        }
    })
    
    var instance = master.createNewInstance()
    instance.frame = {
        x:0,
        y:0,
        width:16,
        height:16
    }
    
    instance.parent = newArtboard;
    newArtboard.parent = symbolsPage

    var group = instance.detach({
        recursively: true
    })
    group.name = name;

    if(checkboxVisible){
        group.exportFormats = ['png'];
    }

    var newMaster = SymbolMaster.fromArtboard(newArtboard)
        
    newMaster.parent = symbolsPage;

    var artboard = master.toArtboard();
    artboard.name = name;
};

const getPrefix = (name) => {
    var prefixName = "";

    if(prefixArr && prefixArr.length>0){
        for(var i=0;i<prefixArr.length;i++){
            if(name.indexOf(prefixArr[i])===0){
                return prefixArr[i]
            }
        }
        prefixName = "";
    }else{
        var nameArr = name.split("-");
        if(nameArr.length>1){
            prefixName = nameArr[0];
        }
    }

    return prefixName
};

const insertIcon = (symbolIcons) => {
    if(!settingData.iconsPageId){
        iconsPage = new Page({
            parent: document,
            name: settingData.prefixString || 'All Icons'
        })
        settingData.iconsPageId = iconsPage.id;
    }

    symbolsPage = Page.getSymbolsPage(document) || "";
    if(!symbolsPage){
        symbolsPage = Page.createSymbolsPage()
        symbolsPage.parent = document
    }
    
    if(symbolStringChange){
        for(var i=0;i<symbolIcons.length;i++){
            var symbolstring = symbolIcons[i];
            var flagIndex = symbolstring.indexOf('<path');

            var need1 = symbolstring.substring(1,flagIndex);
            var need2 = symbolstring.substring(flagIndex);

            var need1json = need1.split(" ");
            var name = need1json[0].split("=")[1];
            var pureName = name.split('"')[1];

            console.log(pureName)
            var item = '<symbol> id="'+name+'" viewBox='+'"0 0 1024 1024">'+need2;

            if(!checkIcon(pureName)){
                doIconSymbol(item,pureName,i);
            }
        }
    }
};

const arrangeArtboards = (context) =>{//重排Artboards
    var artboardList = getFullArtboardList(context);
    DrawArtboardsRows(artboardList,0,0,horizontalGutter,verticalGutter);
};

const changeIconsPageName = () =>{
    var pages = document.pages;
    for(var i=0;i<pages.length;i++){
        if(settingData.iconsPageId===pages[i].id){
            pages[i].name = settingData.prefixString
            return;
        }
    }
};

export default function onRun(context) {
    settingData = Settings.documentSettingForKey(document, settingFlowKey) || {};

    openPannel(context);
}

function openPannel(context) {//打开Webview
    const existingWebview = getWebview(identifier);
    if (existingWebview) {
        if (existingWebview.isVisible()) {
            // close the devtool if it's open
            existingWebview.close()
        }
    }

    let win = new BrowserWindow({
        identifier,
        width: 840,
        height: 510,
        title:"Icon Symbol",
        resizable:true,
        minimizable:true,
        maximizable:true,
        closable:true,
        alwaysOnTop: true
    });

    win.on('closed', () => {
        win = null
    });

    const Panel = `http://localhost:8000/iconSymbol.html#${Math.random()}`;
    win.loadURL(Panel);

    // win.loadURL('http://www.jingwhale.com/whalekit/interactLogic.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(data) {
        checkboxVisible = data.checkboxVisible;
        prefixArr = data.prefixArr;

        if(data.prefixString!=settingData.prefixString){
            prefixStringChange = true;
        }

        if(data.symbolString!=settingData.symbolString){
            symbolStringChange = true;
        }

        insertIcon(data.symbolIcons);
        symbolsPage.selected = true;
        saveSerializData(data);
        arrangeArtboards(context);
        closeWin();
    });

    contents.on('closed', function(s) {
        closeWin();
    });

    // 向Webview传送setSaveIconProject数据
    setSaveIconProject(contents);
}


//向Webview传送allData数据
const setSaveIconProject = (contents) => {
    var allData= JSON.stringify(settingData);

    contents
        .executeJavaScript(`someGlobalFunctionDefinedInTheWebview(${allData})`)
        .then(res => {
            // do something with the result
            console.log("send data success,from plugin to webview!")
        })
};

//save data
const saveSerializData = (data) => {
    //var settingData = Settings.documentSettingForKey(document, settingFlowKey) || [];

    Settings.setDocumentSettingForKey(document, settingFlowKey, data);
};


