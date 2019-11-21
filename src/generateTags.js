import {TAG_INDEX} from "./lib/config";

var Document = require('sketch/dom').Document;
var Group = require('sketch/dom').Group;
var Text = require('sketch/dom').Text;
var Style = require('sketch/dom').Style;
var ShapePath = require('sketch/dom').ShapePath;
var UI  = require('sketch/ui');

var tagIndex = "";
const tagBgColor = "#108EE9";

const createOval = (currentLayer,index) =>{
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
            color: tagBgColor
        }
    ];

    var textTag = tagIndex ? tagIndex : (++index);
    var text = new Text({
        text: ""+textTag,
        alignment: Text.Alignment.center,
        frame: Oval.frame,
        parent: group,
        name: "text"
    });

    text.style.verticalAlignment = "center";
    text.style.fontSize = 14;
    text.style.textColor = "#FFF";
    text.style.lineHeight = Oval.frame.height;
    text.style.width = Oval.frame.width;
    text.style.height = Oval.frame.height;
};

export default function onRun(context) {
    var document = Document.getSelectedDocument();
    var selection = document.selectedLayers;

    if(selection.length>0){
        if(selection.length == 1){
            UI.getInputFromUser("Please select the index of the tag:", {
                type: UI.INPUT_TYPE.selection,
                possibleValues: TAG_INDEX
            }, (err, value) => {
                tagIndex = value;
                selection.forEach((value,index) => {
                    createOval(value,index);
                });
                if (err) {
                    // most likely the user canceled the input
                    return
                }
            });
        }else{
            selection.forEach((value,index) => {
                createOval(value,index);
            });
        }
    }else{
        UI.message("Please select a layer or layers!");
    }
}

