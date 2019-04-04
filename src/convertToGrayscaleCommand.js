import sketch from 'sketch';
import Sketch from 'sketch/dom';
import UI from 'sketch/ui';
import {AllType, PartType, PageType} from "./config";

var Document = Sketch.Document;
var Shape = Sketch.Shape;

var document = Document.getSelectedDocument();

var shapeLayers = [];
var imageLayers = [];
var textLayers = [];

var  graySymbolType = PartType;

export default function onRun() {
    var doc = sketch.getSelectedDocument();
    var page = doc.selectedPage;
    var selection = doc.selectedLayers;
    if(selection.length == 0){//无选中图层
        if(page.layers.length>0){//有选中的页面
            graySymbolType = PageType;
        }else{//无选中的页面
            if(doc.pages.length>0){
                graySymbolType = AllType;
            }else{
                UI.message('Try openning a document!');
            }
        }
    }

    grayTypeSymbol();
};

function grayTypeSymbol() {
    if(graySymbolType == PageType){//选中页面的layers
        grayPage();
    } else if(graySymbolType == PartType){//选中的所有图层
        grayPart();
    }else if(graySymbolType == AllType){//所有文档页面的layers
        grayAll();
    }
}

function grayPart() {
    var doc = sketch.getSelectedDocument();
    var selection = doc.selectedLayers;
    if(selection){
        classifier(selection);
        grayScale(selection);
    }
}

function grayAll() {
    var document = sketch.getSelectedDocument();
    document.pages.forEach(page => {
        grayPageLayes(page);
    });
}

function grayPage() {
    var page = document.selectedPage;
    if(page.layers.length>0) {
        grayPageLayes(page);
    }else{
        UI.message('Try selecting a page!');
    }
}

function grayPageLayes(page) {
    var symbols = page.layers;
    symbols.forEach(symbol => {
        if(symbol.type==="ArtBoard"){//页面包含ArtBoard
            classifier(symbol.layers || []);
        }else{
            classifierLogic(symbol);
        }
    });
    grayScale(symbols);
}

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

        UI.message('Converted to Grayscale successfully！');
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
        classifierLogic(layer);
    });
}

//分类器逻辑判断
function classifierLogic(layer) {
    layer.type === 'Shape' && shapeLayers.push(layer);
    layer.type === 'ShapePath' && shapeLayers.push(layer);
    layer.type === 'Image' && imageLayers.push(layer);
    layer.type === 'Text'  && textLayers.push(layer);
    if(layer.type === 'SymbolInstance'){
        layer = getSymbolMaster(layer);
    }

    classifier(layer.layers || []);
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