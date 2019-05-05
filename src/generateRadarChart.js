import sketch from 'sketch';
import Sketch from 'sketch/dom';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import {getWebview} from 'sketch-module-web-view/remote';

var Image = Sketch.Image;
var Group = Sketch.Group;

var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var chartRect = "";

selection.forEach(layer => (chartRect=layer));

const getImageFrame = (imageData) =>{
    var chartRectWidth = (chartRect.frame.width > imageData.width ) ? chartRect.frame.width : imageData.width;

    var chartRectheight = (chartRect.frame.width > imageData.width ) ? ((chartRect.frame.width*imageData.height)/imageData.width) : imageData.height;

    var imageFrame = {
        x:0,
        y:0,
        width:chartRectWidth,
        height:chartRectheight
    };

    insertImageToArtbord(imageData,imageFrame);
};

const insertImageToArtbord = (imageData,imageFrame) =>{
    console.log(imageData)
    console.log(imageFrame)
    //Create grid group
    const group = new Group({
        name: 'radar chart',
        parent: chartRect.parent,
        frame: {
            x:chartRect.frame.x,
            y:chartRect.frame.y,
            width:imageFrame.width,
            height:imageFrame.height,
        }
    });

    //Create screenshot
    if(imageData.base64){
        var imageLayer = new Image({
            image: {
                base64: imageData.base64
            },
            name:"screenshot",
            frame: imageFrame
        });
        imageLayer.parent = group || page;

        chartRect.remove();
    }else{
        sketch.UI.message("No base64 image resource!")
    }


};

export default function onRun(context) {
    if(chartRect && chartRect.shapeType=="Rectangle"){
        openPannel();
    }else{//选择一个ArtBord
        sketch.UI.message("Please select an Rectangle!")
    }
}

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
        width: 660,
        height: 430,
        title:"Radar Chart UI",
        resizable:true,
        minimizable:false,
        maximizable:false,
        closable:true,
        alwaysOnTop: true
    });
    win.on('closed', () => {
        win = null
    });
    const Panel = `http://localhost:8000/radarchart.html#${Math.random()}`;
    win.loadURL(Panel);

    // win.loadURL('http://whalexplorer.coding.me/whale-kit/screenshot.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(data) {
        getImageFrame(data);
        sketch.UI.message("Successfully screenshot and insert into Rectangle！");
        closeWin();
    });

    contents.on('closed', function(s) {
        closeWin();
    });
}


