import sketch from 'sketch'
import Sketch from 'sketch/dom'

var Image = Sketch.Image;

var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var artboardRect = "";

selection.forEach(layer => (artboardRect=layer));

var basesd= "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";
var imageSize = {
    width:641,
    height:37
};
var imageFrame = {
    x:0,
    y:(artboardRect.frame.width > 834) ? 60:20,
    width: 641,
    height: 37
};

const getImageFrame = () =>{
    if(imageSize.width>artboardRect.frame.width){
        var width = artboardRect.frame.width*0.95;

        var rate = width/imageSize.width;

        imageFrame.width = width;
        imageFrame.height = imageFrame.height*rate;
    }

    imageFrame.x = (artboardRect.frame.width-imageFrame.width)/2;

    if(imageSize.height>artboardRect.frame.height){
        artboardRect.frame.height = imageSize.height + imageFrame.y
    }
};

if(artboardRect && artboardRect.type=="Artboard"){
    getImageFrame();

    var imageLayer = new Image({
        image: {
            base64: basesd
        },
        frame: imageFrame
    });

    imageLayer.parent = artboardRect || page;
}else{
    sketch.UI.message("请选中一个Artboard！");
}


