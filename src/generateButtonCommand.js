import sketch from 'sketch'
import Sketch from 'sketch/dom'
var  Group = Sketch.Group;
var Text = Sketch.Text;
var Document = Sketch.Document;
var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var buttonRect = "";

selection.forEach(layer => (buttonRect=layer))

export default function(context) {
    if(!buttonRect){//选择一个矩形
        sketch.UI.message("请选择一个矩形！")
    }else{
        //Create Body(Group)
        const group = new Group({
            name: 'button group',
            parent:(buttonRect.parent || page)
        })

        buttonRect.parent = group;

        //Create Body(Group)-Text
        const text = new Text({
            text: 'button',
            alignment: Text.Alignment.center,
            frame: buttonRect.frame,
            parent: group,
            name: "text"
        })

        text.style.verticalAlignment = "center";
        text.style.fontSize = (buttonRect.frame.height*0.4);
        text.style.lineHeight = buttonRect.frame.height;
        text.style.width = buttonRect.frame.width;
        text.style.height = buttonRect.frame.height;
    }
}
