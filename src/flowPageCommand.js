const Shape = require('sketch/dom').Shape;
const Artboard = require('sketch/dom').Artboard;
const Group = require('sketch/dom').Group;
const Page = require('sketch/dom').Page;
const Rectangle = require('sketch/dom').Rectangle;
const Document = require('sketch/dom').Document;
const Text = require('sketch/dom').Text;
const Sketch = require('sketch/dom');
var index = 0
export default function(context) {
    const document = Document.getSelectedDocument()
    const page = document.selectedPage;
    page.name = "page flow";
    console.log(index++)

    //Create Artboard
    const rect = new Rectangle(0, 0, 180, 178)
    const artboard = new Artboard({
        name: 'Page name',
        flowStartPoint: true,
        frame:rect,
        parent: page
    })

    //Create Tile(Shape)
    const rect2 = new Rectangle(0, 0, 180, 10)
    const shapeTtile = new Shape({
        parent: artboard,
        name: "title",
        frame: rect2,
        style: {
            borders: [{ color: '#000' }]
        },
    });
    //add title color
    const colors = ["#304FFE","#651FFF",'#CDDC39','#EB2F96',"#D9D9D9","#00BFA5"]
    var  colorIndex = Math.floor(Math.random() * 10);

    if(colorIndex>5){
        colorIndex = 0;
    }

    shapeTtile.style.fills = [
        {
            color: colors[colorIndex]
        },
    ]

    //Create Body(Group)
    const group = new Group({
        name: 'body',
        parent:artboard
    })

    //Create Body(Group)-Item
    const rect1 = new Rectangle(22, 30, 136, 26)
    const shape = new Shape({
        parent: group,
        name: "item",
        frame: rect1,
        style: {
            borders: [{ color: '#000' }]
        },
    });

    //Create Body(Group)-Text
    const text = new Text({
        text: 'text text text text',
        alignment: Text.Alignment.center,
        frame: rect1,
        parent: group,
        name: "text"
    })
    text.style.verticalAlignment = "center";
    text.style.fontSize = 12;
    text.style.lineHeight = 26;

    shape.adjustToFit();
    group.adjustToFit()

}



