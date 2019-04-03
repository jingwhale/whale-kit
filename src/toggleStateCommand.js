import sketch from 'sketch';
import Sketch from 'sketch/dom';
import UI from 'sketch/ui';
import {stateColor, STATE_NOAMAL, STATE_ACTIVE, STATE_DISABLED} from "./config";

var Document = Sketch.Document;
var Shape = Sketch.Shape;

var document = Document.getSelectedDocument();


//灰度设置
function grayScale(selection) {
    if(selection) {
        // Grayscale "Shape" layers
        shapeLayers.forEach(layer => {
            // *** ALL THE FILL / GRADIENT COLORS  *** //
            if (layer.style.fills) {
                layer.style.fills.forEach(fill => {
                    if (fill.fill === "Gradient") {
                        fill.gradient.stops.forEach(stop => {
                            stop.color = convertHexToGrayscaleRGBAString(stop.color);
                        })
                    } else {
                        fill.color = convertHexToGrayscaleRGBAString(fill.color);
                    }
                })
            }

            // *** 1st STROKE COLOR *** //
            if (layer.style.borders) {
                layer.style.borders.forEach(border => {
                    if (border.fillType === "Gradient") {
                        border.gradient.stops.forEach(stop => {
                            stop.color = convertHexToGrayscaleRGBAString(stop.color);
                        })
                    } else {
                        border.color = convertHexToGrayscaleRGBAString(border.color);
                    }
                })
            }

        });

        // Grayscale "Text" layers
        textLayers.forEach(layer => {
            var color = convertHexToGrayscaleRGBAString(layer.style.textColor);
            layer.style.textColor = color;
        });

        // Grayscale "Image" layers
        imageLayers.forEach(layer => {
            UI.message('This plugin doesnt work for image layers.');
        });

    } else {
        UI.message('Try selecting some shapes');
    }
}

//获取symbolMaster
function getSymbolMaster(layer){
    if(layer.symbolId){
        var symbolMaster = document.getSymbolMasterWithID(layer.symbolId);
        if(symbolMaster.type == "SymbolInstance"){
            getSymbolMaster(symbolMaster);
        }else if(symbolMaster.type == "SymbolMaster"){
            return symbolMaster;
        }
    }
}

//分类器
function classifier(selection) {
    selection.forEach( function iterate(layer) {
        layer.type === 'Shape' && shapeLayers.push(layer);
        layer.type === 'ShapePath' && shapeLayers.push(layer);
        layer.type === 'Image' && imageLayers.push(layer);
        layer.type === 'Text'  && textLayers.push(layer);
        if((graySymbolType != "all") && (layer.type === 'SymbolInstance')){
            layer = getSymbolMaster(layer);
        }

        (layer.layers || []).forEach(iterate);
    });
}

// HELPERS
function convertHexToGrayscaleRGBAString(hex) {
    // Calculate the opacity
    var opacity = parseInt(hex.substring(hex.length - 2, hex.length), 16) / 255;

    // Chop off the opacity and convert to RGB
    hex = hex.substring(0, hex.length - 2);
    var rgb = hexToRGB(hex);

    // Calculate & set gray value based on "Luma"
    // Source: http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
    var gray = (rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722);
    return 'rgba(' + gray+ ',' + gray + ',' + gray + ',' + opacity + ')';
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export default function onRun(context) {
    // grayPartSymbol();

    grayAllSymbol();

    // changeState
};

function graySymbol() {
    if(graySymbolType = "symbols"){
        var page = document.selectedPage;
        if(page && (page.name = "Symbols")){
            graySymbolType = "Symbols";//symbol页面
            grayAllSymbol(page.layers);
        }else{
            UI.message('Try selecting a Symbols page!');
        }
    }else if(graySymbolType == "allSymbols"){//文档所有的symbol
        graySymbolType = "all";
        var symbols = document.getSymbols();
        if(symbols.length>0){
            grayAllSymbol(symbols);
        }else{
            UI.message('This document no symbol!');
        }
    }else if(graySymbolType == "part"){//选中的所有图层
        var doc = sketch.getSelectedDocument();
        var selection = doc.selectedLayers;
        if(selection){
            grayPartSymbol(selection);
        }
    }else if(graySymbolType == "all"){//所有文档页面的layers
        var doc = sketch.getSelectedDocument();
        var selection = doc.selectedLayers;
        if(selection){
            grayPartSymbol(selection);
        }
    }
}

function grayAllSymbol() {
    symbols.forEach(symbol => {
        classifier(symbol.layers || []);
    });
    grayScale(symbols);
}

function grayPartSymbol(selection) {
    classifier(selection);
    grayScale(selection);
}

//改变状态
function changeState() {
    if(selection){
        doSelection(selection);
    }else{
        sketch.UI.message("Please select a layer or layers!");
    }
}

//state ，默认常量
var state = STATE_ACTIVE;

//循环属性数组，change color
const doColor = (name,styleName) =>{
    for(var i=0;i<name.length;i++){
        if(name[i][styleName] == Style.FillType.Color){
            name[i].color = stateColor[state];
            return;
        }
    }
};

//获取fills、borders属性数组，调用doColor change color
const changeColor = (layer) =>{
    var fills = layer.style.fills;
    fills && doColor(fills,"fill");
    var borders = layer.style.borders;
    borders && doColor(borders,"fillType");
};

//判断layer的不同类型，调用不同的处理函数
const doToggleState = (layer) =>{
    if(layer.type == "ShapePath" || layer.type == "Shape"){
        changeColor(layer);
    }else if(layer.type == "Text"){
        layer.style.textColor = stateColor[state];
    }else if(layer.type == "Group"){
        doSelection(layer.layers);
    }else{
        sketch.UI.message("Please select with Group 、Text or ShapePath type!");
    }
};

//判断图层的数量，调用不同的方法处理
const doSelection = (selection) =>{
    doSelectionGrop(selection);//全部按照图层组处理
};

//处理图层组
const doSelectionGrop = (selection) =>{
    selection.forEach(layer => (
        doSelectionSingle(layer)
    ))
};

//处理单个图层
const doSelectionSingle = (layer) =>{
    doToggleState(layer)
};





