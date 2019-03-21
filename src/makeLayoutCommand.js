import sketch from 'sketch'
import Sketch from 'sketch/dom'
import BrowserWindow from 'sketch-module-web-view'

var Group = Sketch.Group;
var Text = Sketch.Text;
var Rectangle = Sketch.Rectangle;
var Shape = Sketch.Shape;
var Document = Sketch.Document;

var document = Document.getSelectedDocument();

var page = document.selectedPage;

var selection = document.selectedLayers;

var buttonRect = "";

selection.forEach(layer => (buttonRect=layer))


if(!buttonRect){//选择一个矩形
    sketch.UI.message("请选择一个矩形！")
}else{
    let win = new BrowserWindow({
        width: 533,
        height: 303 ,
        title:"Make Layout",
        resizable:false,
        minimizable:false,
        maximizable:false,
        closable:false
    })
    win.on('closed', () => {
        win = null
    })

    // Load a localhost URL
    const Panel = `http://localhost:8000/pagelayout.html#${Math.random()}`;
    win.loadURL(Panel)


    const dist = (data,type) => {
        var dist = "";
        if(type=="height"){
            dist = (buttonRect.frame[type]-(data.rows-1)*data.rowMargin)/data.rows;
        }else{
            dist = (buttonRect.frame[type]-(data.columns-1)*data.columnMargin)/data.columns;
        }
        return dist;
    }

    const createGrid = (data,index,group) =>{
        var coordinate = {
            x: Math.ceil(index/data.columns),
            y:  (index%data.columns == 0) ? data.columns : index%data.columns
        };

        var frame = {
            x:  (coordinate.y-1)*(data.frameData.width+data.rowMargin),
            y:  (coordinate.x-1)*(data.frameData.height+data.columnMargin),
            width: data.frameData.width,
            height: data.frameData.height
        };

        //Create Body(Group)
        const groupitem = new Group({
            name: 'item group',
            parent: group
        })

        //Create Body(Group)-Item
        const rect = new Rectangle(frame.x, frame.y, frame.width, frame.height);
        const shape = new Shape({
            parent: groupitem,
            name: "item",
            frame: rect,
            style: {
                borders: [{ color: '#000' }]
            },
        });

        if(data.showCoordinate){
            //Create Body(Group)-Text
            const text = new Text({
                text: coordinate.x + ","+coordinate.y,
                frame: rect,
                alignment: Text.Alignment.center,
                parent: groupitem,
                name: "text"
            })
            text.style.textAlign = "center";
            text.style.verticalAlignment = "center";
            text.style.fontSize = 12;
            text.style.lineHeight = frame.height;
            text.style.width = frame.width;
            text.style.height = frame.height;
        }

        shape.adjustToFit();
        groupitem.adjustToFit();

    }

    //执行webview的代码
    const makeLayout = (data) => {
        var frameData = {
            width:dist(data,"width"),
            height:dist(data,"height")
        }

        data.frameData = frameData;

        //Create Body(Group)
        const layoutgroup = new Group({
            name: 'layout',
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

        //Create Body(Group)
        const group = new Group({
            name: 'grid',
            parent: layoutgroup,
            frame: frame
        });

        for (var i=1;i<(data.rows*data.columns+1);i++){
            createGrid(data,i,group);
        };
    }

    const closeWin = () =>{
        win.destroy();
        win.close();
    }

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(s) {
        makeLayout(s);
        closeWin()
    });

    contents.on('closed', function(s) {
        closeWin();
    });
}

