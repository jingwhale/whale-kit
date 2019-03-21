import sketch from 'sketch'
import BrowserWindow from 'sketch-module-web-view'
import Sketch from 'sketch/dom'

var Document = Sketch.Document;
var document = Document.getSelectedDocument();

var page = document.selectedPage;
console.log(page)

if(!page){
    return;
}

var selection = document.selectedLayers;

var buttonRect = "";

selection.forEach(layer => (buttonRect=layer))


if(!buttonRect){
   export default function() {
       sketch.UI.message("请选择一个矩形！")
   }
    return;
}else{

}
