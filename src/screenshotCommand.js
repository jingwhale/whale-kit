import sketch from 'sketch'
import Sketch from 'sketch/dom'
import BrowserWindow from "sketch-module-web-view";

var Image = Sketch.Image;

var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var artboardRect = "";

selection.forEach(layer => (artboardRect=layer));

const getImageFrame = (imageSize) =>{
    var imageFrame = {
        x:0,
        y:(artboardRect.frame.width > 834) ? 60:20,
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

    if(imageSize.height>artboardRect.frame.height){
        artboardRect.frame.height = imageSize.height + imageFrame.y*2
    }

    insertImageToArtbord(imageSize,imageFrame);
};

const insertImageToArtbord = (imageSize,imageFrame) =>{
    var imageLayer = new Image({
        image: {
            base64: imageSize.base64
        },
        frame: imageFrame
    });

    imageLayer.parent = artboardRect || page;
};

if(artboardRect && artboardRect.type=="Artboard"){
    let win = new BrowserWindow({
        width: 408,
        height: 323,
        title:"Web Screen Shot",
        resizable:false,
        minimizable:false,
        maximizable:false,
        closable:true
    })
    win.on('closed', () => {
        win = null
    });
    const Panel = `http://localhost:8000/screenshot.html#${Math.random()}`;
    win.loadURL(Panel);

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


