import sketch from 'sketch';
import Sketch from 'sketch/dom';
import Settings from 'sketch/settings';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import {getWebview} from 'sketch-module-web-view/remote';


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

var artboard = "";
selection.forEach(layer => (artboard=layer));


const insertIcon = () =>{//插入Icon

};

const insertIconTitle = (data) =>{//插入标题

};

const doIconSymbol = (data) =>{//doIconSymbol
    var symbolIcons = data.symbolIcons;
    //insertIconTitle(data);
    for(var i=0;i<6;i++){
        var svgString = '<symbol>'+symbolIcons[i];
        var group = sketch.createLayerFromData(svgString, 'svg');
        group.name = "test";
        group.parent = artboard;
    }
};

export default function onRun(context) {
    if(artboard && artboard.type=="Artboard"){
        openPannel();
    }else{//选择一个ArtBord
        sketch.UI.message("Please select an ArtBord!")
    }
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
        doIconSymbol(data);
        saveSerializData();
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


