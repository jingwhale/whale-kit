import sketch from 'sketch';
import Sketch from 'sketch/dom';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import { getWebview } from 'sketch-module-web-view/remote';

var Image = Sketch.Image;
var Text = Sketch.Text;

var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var artboardRect = "";

var fontSize = 28;

var textLinkFontSize = 12;

var textLinkDist = 16;

var textDistImage = 32;

var textFixDist = 0;

var textReviseWidth = 112;

selection.forEach(layer => (artboardRect=layer));

const getImageFrame = (imageSize) =>{
    var textFrame = {
        x:0,
        y:(artboardRect.frame.width > 834) ? 60:20,
        width:100,
        height: fontSize
    };
    var imageFrame = {
        x:0,
        y:(textFrame.y+textDistImage+fontSize),
        width: imageSize.width,
        height: imageSize.height
    };
    if(imageSize.width>artboardRect.frame.width){
        var width = artboardRect.frame.width*0.95;

        var rate = width/imageSize.width;

        imageFrame.width = width;
        imageFrame.height = imageFrame.height*rate;
    }

    imageFrame.x = (artboardRect.frame.width-imageFrame.width)/2;

    artboardRect.frame.height = imageSize.height + textFrame.y*2+textDistImage + fontSize;

    textFrame.x = imageFrame.x + textFixDist;

    insertImageToArtbord(imageSize,imageFrame,textFrame);
};

const insertImageToArtbord = (imageSize,imageFrame,textFrame) =>{
    //Create screenshot
    var imageLayer = new Image({
        image: {
            base64: imageSize.base64
        },
        name:"screenshot",
        frame: imageFrame
    });

    imageLayer.parent = artboardRect || page;

    //Create 修订记录
    const text = new Text({
        text: imageSize.artBoardName,
        alignment: Text.Alignment.left,
        frame: textFrame,
        parent: artboardRect || page,
        name: imageSize.artBoardName
    });

    text.style.fontSize = textFrame.height;
    text.style.lineHeight = textFrame.height;
    text.style.fontWeight = "bold";

    //Create 修订记录 link
    const textLink = new Text({
        text: imageSize.url,
        alignment: Text.Alignment.left,
        frame: {
            x:textFrame.x+textReviseWidth+textLinkDist,
            y:textFrame.y+(fontSize-textLinkFontSize),
            width: 300,
            height: textLinkFontSize
        },
        parent: artboardRect || page,
        name: "link"
    });

    textLink.style.fontSize = textLinkFontSize;
    textLink.style.lineHeight = textLinkFontSize;

    var newTextLinkFrame = textLink.frame;
    textLink.frame.x = imageFrame.x+imageFrame.width-newTextLinkFrame.width;

    //name artBoard
    artboardRect.name = imageSize.artBoardName;
};

if(artboardRect && artboardRect.type=="Artboard"){
    const existingWebview = getWebview(identifier);
    if (existingWebview) {
        if (existingWebview.isVisible()) {
            // close the devtool if it's open
            existingWebview.close()
        }
    }

    let win = new BrowserWindow({
        identifier,
        width: 408,
        height: 356,
        title:"Web Screen Shot",
        resizable:false,
        minimizable:false,
        maximizable:false,
        closable:true,
        alwaysOnTop: true
    });
    win.on('closed', () => {
        win = null
    });
    // const Panel = `http://localhost:8000/screenshot.html#${Math.random()}`;
    // win.loadURL(Panel);

    win.loadURL('http://whalexplorer.coding.me/whale-kit/screenshot.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(data) {
        getImageFrame(data);
        sketch.UI.message("Successfully screenshot and insert into Artboard！");
        closeWin();
    });

    contents.on('closed', function(s) {
        closeWin();
    });
}else{
    sketch.UI.message("Please select an Artboard!");
}


