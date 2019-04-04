import sketch from 'sketch';
import tinycolor from 'tinycolor2';
import UI from 'sketch/ui';
import {StateColorAmt, STATE_ACTIVE, STATE_DISABLED} from "./config";

var Style = require('sketch/dom').Style;
var nowState = STATE_ACTIVE;

var doc = sketch.getSelectedDocument();
var selection = doc.selectedLayers;

function LightenDarkenColor(color,type) {
    var newColor = "";
    if(type === "brighten"){
        newColor = tinycolor(color).brighten(StateColorAmt);
    }else if(type === "darken"){
        newColor = tinycolor(color).darken(StateColorAmt);
    }
    return newColor.toString();
}

const setSateActive = (style,name) =>{
    console.log("setSateActive");
    console.log(style[name]);
    console.log(LightenDarkenColor(style[name],"darken"));
    style[name] = LightenDarkenColor(style[name],"darken");
};

const setSateDisabled = (style,name) =>{
    console.log(LightenDarkenColor(style[name],"brighten"));
    style[name] = LightenDarkenColor(style[name],"brighten");
};

const setStateColor = (style,name) =>{
    console.log("setStateColor");
    switch (nowState){
        case STATE_ACTIVE:
            setSateActive(style,name);
            break;
        case STATE_DISABLED:
            setSateDisabled(style,name);
            break;
        default:
            console.log(nowState);
    }
    UI.message(nowState+"!");
};

//循环属性数组,change color
const doColor = (name,styleName) =>{
    for(var i=0;i<name.length;i++){
        if(name[i][styleName] == Style.FillType.Color){
            setStateColor(name[i],"color");
            return;
        }
    }
};

//循环属性数组,change color
const doTextColor = (style) =>{
    setStateColor(style,"textColor");
};

//获取fills、borders属性数组,调用doColor change color
const changeColor = (layer) =>{
    var fills = layer.style.fills;
    fills && doColor(fills,"fill");
    var borders = layer.style.borders;
    borders && doColor(borders,"fillType");
};

//获取fills、borders属性数组,调用doColor change color
const changeTextColor = (layer) =>{
    var textColor = layer.style.textColor;
    textColor && doTextColor(layer.style);
};

//判断layer的不同类型,调用不同的处理函数
const doToggleState = (layer) =>{
    if(layer.type == "ShapePath" || layer.type == "Shape"){
        changeColor(layer);
    }else if(layer.type == "Text"){
        changeTextColor(layer);
    }else if(layer.type == "Group"){
        doSelection(layer.layers);
    }else{
        UI.message("Please select with Group 、Text or ShapePath type!");
    }
};

//处理单个图层
const doSelectionSingle = (layer) =>{
    doToggleState(layer)
};

//处理图层组
const doSelectionGrop = (selection) =>{
    selection.forEach(layer => (
        doSelectionSingle(layer)
    ))
};

//判断图层的数量,调用不同的方法处理
const doSelection = (selection) =>{
    doSelectionGrop(selection);//全部按照图层组处理
};

//改变状态
const changeState = () =>{
    if(selection){
        doSelection(selection);
        UI.message("State changed to "+ nowState+"!");
    }else{
        UI.message("Please select a layer or layers!");
    }
};

export default function onRun() {
    UI.getInputFromUser("Please select the status you want to change to:", {
        type: UI.INPUT_TYPE.selection,
        possibleValues: [STATE_ACTIVE, STATE_DISABLED]
    }, (err, value) => {
        nowState = value;
        changeState();
        if (err) {
            UI.message(err);
            return
        }
    });
};
