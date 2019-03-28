import sketch from 'sketch'
import Sketch from 'sketch/dom'

var Group = Sketch.Group;
var Text = Sketch.Text;
var Image = Sketch.Image;

var Rectangle = Sketch.Rectangle;
var Shape = Sketch.Shape;
var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var buttonRect = "";

selection.forEach(layer => (buttonRect=layer));

const data = {
    image:{
        width:64,
        height:52,
        rate:0.2
    },
    avatar:{
        width:65,
        height:78,
        rate:0.6
    },
    carousel:{
        width:62,
        height:42,
        rate:0.3
    }
};

if(!buttonRect){//选择一个矩形
    sketch.UI.message("请选择一个矩形！")
}else{
    const doImageFrame = (type) => {
        var configData = data[type];
        var rate = data[type].rate;
        var size = {};
        size.width = buttonRect.frame.width*rate;
        size.height = (size.width*configData.height)/configData.width;
        if(buttonRect.frame.height <= size.height){
            size.height = buttonRect.frame.height*rate;
            size.width = (size.height*configData.width)/configData.height;
        }
        size.x=(buttonRect.frame.width-size.width)/2;
        size.y=(buttonRect.frame.height-size.height)/2;
        return size;
    };

    const doImage = (type) => {
        //Create Group
        var imageFrame = doImageFrame(type);
        var url = type+".png";
        const imageURL = context.plugin.urlForResourceNamed(url);
        const layoutgroup = new Group({
            name: 'image',
            parent: (buttonRect.parent || page),
            frame: buttonRect.frame
        });

        buttonRect.parent = layoutgroup;

        var frame = {
            x: 0,
            y: 0,
            width:buttonRect.frame.width,
            height:buttonRect.frame.height
        };

        buttonRect.frame = frame;

        var imageLayer = new Image({
            image: imageURL,
            frame:{
                x: imageFrame.x,
                y: imageFrame.y,
                width:imageFrame.width,
                height:imageFrame.height
            }
        });

        imageLayer.parent = layoutgroup;
    };

    var type = "image";
    switch(buttonRect.shapeType){
        case "Rectangle":
            if(buttonRect.points[0].cornerRadius!=0){
                type = "carousel";
            }
            break;
        case "Oval":
            type = "avatar";
            break;
    }

    doImage(type);
}

