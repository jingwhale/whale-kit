var Document = require('sketch/dom').Document
var Group = require('sketch/dom').Group
var Text = require('sketch/dom').Text
var Style = require('sketch/dom').Style
var ShapePath = require('sketch/dom').ShapePath

const createOval = (currentLayer,indexTag) =>{
    var group = new Group({
        name: 'Tags',
        parent:currentLayer
    });

    var Oval = new ShapePath({
        name: 'tag',
        shapeType: ShapePath.ShapeType.Oval,
        frame:{x:currentLayer.frame.width+10,y:0,width:30,height:30},
        parent: group
    });

    Oval.style.fills = [
        {
            fill: Style.FillType.Color,
            color: '#d8d8d8ff'
        }
    ];

    var text = new Text({
        text: ""+(++indexTag),
        alignment: Text.Alignment.center,
        frame: Oval.frame,
        parent: group,
        name: "text"
    });

    text.style.verticalAlignment = "center";
    text.style.fontSize = 14;
    text.style.lineHeight = Oval.frame.height;
    text.style.width = Oval.frame.width;
    text.style.height = Oval.frame.height;
};

export default function onRun(context) {
    var document = Document.getSelectedDocument();
    var selection = document.selectedLayers;

    selection.forEach((value,index) => {
        createOval(value,index);
    });
}

