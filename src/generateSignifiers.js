import sketch from 'sketch';
import Sketch from 'sketch/dom';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import {getWebview} from 'sketch-module-web-view/remote';

var Group = Sketch.Group;

var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var currentLayer = "";

selection.forEach(layer => (currentLayer=layer));

const insertSignifiers = (svgObj,parentLayer) =>{
    const svgGroup = Sketch.createLayerFromData(svgObj.svgXml, 'svg');

    svgGroup.parent = parentLayer;
};

const doPageArtboardFrame = (svgObj) =>{
    var parentGroupFrame = {
        x: 0+16,
        y: JSON.parse(JSON.stringify(currentLayer.frame.height)) +16,
        width: svgObj.size.width,
        height: svgObj.size.height+20
    };

    //resize artBoard width
    currentLayer.frame.height = currentLayer.frame.height + svgObj.size.height + 20;

    var parentGroup = new Group({
        name: '页面说明',
        parent:currentLayer,
        frame: parentGroupFrame
    });

    return parentGroup;
};

const doComponentArtboardFrame = (svgObj) =>{
    var parentGroupFrame = {
        x: JSON.parse(JSON.stringify(currentLayer.frame.width))+10,
        y: 0+10,
        width: svgObj.size.width,
        height: svgObj.size.height
    };

    //resize artBoard width
    currentLayer.frame.width=currentLayer.frame.width + svgObj.size.width+10*2;
    if(svgObj.size.height>currentLayer.frame.height){
        currentLayer.frame.height = svgObj.size.height+10;
    }

    var parentGroup = new Group({
        name: '交互说明',
        parent:currentLayer,
        frame: parentGroupFrame
    });

    return parentGroup;
};

const adjustArtboardFrame = (svgObj) =>{
    var parentGroup = "";

    if(svgObj.type=="page"){
        parentGroup = doPageArtboardFrame(svgObj)
    }else{
        parentGroup = doComponentArtboardFrame(svgObj);
    }

    insertSignifiers(svgObj,parentGroup);
};



const doSignifiers = (svgObj) =>{
    adjustArtboardFrame(svgObj);
};

export default function onRun(context) {
    if(currentLayer && currentLayer.type=="Artboard"){
        openPannel();
    }else{//选择一个ArtBord
        sketch.UI.message("Please select an Artboard!")
    }
}
const sketchFlag = {
    flag: true
};
//执行webview的代码
const setSketchFlag = (contents) => {
    contents
        .executeJavaScript(`someGlobalFunctionDefinedInTheWebview(${JSON.stringify(sketchFlag)})`)
        .then(res => {
            // do something with the result
            console.log("send data success,from plugin to webview!")
        })
};

function openPannel() {
    const existingWebview = getWebview(identifier);
    if (existingWebview) {
        if (existingWebview.isVisible()) {
            // close the devtool if it's open
            existingWebview.close()
        }
    }

    let win = new BrowserWindow({
        identifier,
        width: 1350,
        height: 800,
        title:"Generate Signifiers UI",
        resizable:true,
        minimizable:true,
        maximizable:true,
        closable:true,
        alwaysOnTop: true
    });
    win.on('closed', () => {
        win = null
    });
    // const Panel = `http://localhost:8000/designsignifiers.html#${Math.random()}`;
    // win.loadURL(Panel);

    win.loadURL('http://whalexplorer.coding.me/whale-kit/designsignifiers.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(svgObj) {
        doSignifiers(svgObj);
        sketch.UI.message("Successfully inserted Signifiers into Artboard！");
        closeWin();
    });

    contents.on('closed', function(s) {
        closeWin();
    });

    setSketchFlag(contents);
}


