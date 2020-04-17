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

const settingFlowKey = "settingFlowKey";
const lineCount = 22;
const iconDist = 32;
const iconWidth = 32;
const horizontalGutter = 100;
const verticalGutter = 30;
var checkboxVisible = true;

var symbolsPage = "";

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
    group.name = name.toString();
    group.frame.x= (newArtboard.frame.width-group.frame.width)/2
    group.frame.y= (newArtboard.frame.height-group.frame.height)/2
    group.parent = newArtboard;

    if(checkboxVisible){
        group.exportFormats = ['png'];
    }
    
    var master = SymbolMaster.fromArtboard(newArtboard)

    master.parent = symbolsPage;
};

const checkIcon = (name) => {
    var icons = symbolsPage.layers || [];
    for(var i=0;i<icons.length;i++){
      if(icons[i].name === name){
        return true
      }
    }
    return false
};

const insertIcon = (symbolIcons) => {
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
};

const arrangeArtboards = (context) =>{//重排Artboards
    var artboardList = getFullArtboardList(context);
    DrawArtboardsRows(artboardList,0,0,horizontalGutter,verticalGutter);
};

export default function onRun(context) {
    symbolsPage = Page.getSymbolsPage(document) || "";
    if(!symbolsPage){
        symbolsPage = Page.createSymbolsPage()
        symbolsPage.parent = document
    }

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
        insertIcon(data.symbolIcons);
        symbolsPage.selected = true;
        //saveSerializData(data);
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
    var settingData = Settings.documentSettingForKey(document, settingFlowKey) || [];

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
    var settingData = Settings.documentSettingForKey(document, settingFlowKey) || [];
    var item = {
        name:data.name,
        symbolIcons: data.symbolIcons
    };

    settingData.push(item);

    Settings.setDocumentSettingForKey(document, settingFlowKey, settingData);
};


