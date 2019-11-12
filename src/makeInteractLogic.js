import sketch from 'sketch';
import Sketch from 'sketch/dom';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import {getWebview} from 'sketch-module-web-view/remote';

const Group = Sketch.Group;
const Document = Sketch.Document;
const Rectangle = Sketch.Rectangle;
const ShapePath = Sketch.ShapePath;
const Artboard = Sketch.Artboard;
const Page = Sketch.Page;
const document = Document.getSelectedDocument();

var selectedPage = document.selectedPage;
var selectedArtBoards = selectedPage.layers;
var flowArtboard = "";
var dist = {};

const createPageAndArtboard = (artBoardId,positon) =>{//创建交互流程页面与Artboard
    var flowPage = new Page({
        name: '交互流程',
        parent: document
      })
      
      var flowFrame = {
          x:0,
          y:0,
          width:1440,
          height: 1024
      };
      
      flowArtboard = new Artboard({
        name: '交互流程',
        parent:flowPage,
        frame:flowFrame
      })
};

const makeInteractLogic = (artBoardData) =>{//建立交互流程
    var artBoardId = "";
    var positonIndex = {};
    for(var i=0;i<artBoardData.length;i++){
        if(artBoardData[i].child && artBoardData[i].child.length > 0){
            var child = artBoardData[i].child;
            for(var i=0;i<child.length;i++){
                artBoardId = child[i].artBoardId;
                positonIndex = {
                    x:i,
                    y:j
                };
                doPageFlow(artBoardId,positonIndex);
            };
        }else{

        }
    };
};

const doPageFlow = (artBoardId,positon) =>{//移动页面到flowArtboard
    var currentArtboard = findArtBoardById(artBoardId);

    //创建移动新组，包含当前Artboard和当前Artboard的框
    const flowGroup = new Group({
        name: currentArtboard.name,
        frame: getCurrentArtboardFrame(positon,currentArtboard)
    });

    //拷贝当前Artboard
    var copyBoard = artboard.duplicate();
    var copyBoardFrame = {
        x:0,
        y:0,
        width:copyBoard.frame.width,
        height:copyBoard.frame.height
    };
    copyBoard.frame = copyBoardFrame;
    copyBoard.parent = flowGroup;

    //创建当前Artboard的框（拷贝图层后，是没有框）
    var rectBgFrame = new Rectangle(0, 0, copyBoard.frame.width, copyBoard.frame.height);

    const rectBg = new ShapePath({
        name: "layput",
        frame:rectBgFrame,
        shapeType: ShapePath.ShapeType.Rectangle,
        parent:flowGroup,
        style:{
            borders:[{color:'#C9C9C9'}]
        }
    })

    //将flowGroup移动到flowArtboard中
    flowGroup.parent = flowArtboard;
};

const findArtBoardById = (artBoardId) =>{//通过artBoardId查找artBoard
    for(var i=0;i<selectedArtBoards.length;i++){
        if(selectedArtBoards[i].id = artBoardId){
            return selectedArtBoards[i];
        }
    };
};

const getCurrentArtboardFrame = (positon,currentArtboard) =>{//获取当前Artboard在flowArtboard的位置，frame参数
    var initPositnX = 0;
    var initPositnY = 0;
    var frame = {
        x:initPositnX,
        y:initPositnY,
        width:currentArtboard.frame.width,
        height:currentArtboard.frame.height
    }
    if(positon.y==="undefined"){
        frame.x = getCurrentArtboardFrameX(positon);
    }else{
        frame.x = getCurrentArtboardFrameX(positon);
        frame.y = getCurrentArtboardFrameY(positon);
    }

    return frame;
};

const getCurrentArtboardFrameX = (positon) =>{//获取当前Artboard在flowArtboard的位置，frame x参数
    var ArtboardDist = "";
    var stepDist = "";
    var distX = "";
    for(var i=0;i<positon.x;i++){
        ArtboardDist += selectedArtBoards[i].frame.width
    };
    stepDist = dist.step*positon.x;

    distX = ArtboardDist + stepDist;

    return distX;
};

const getCurrentArtboardFrameY = (positon) =>{//获取当前Artboard在flowArtboard的位置，frame y参数
    var ArtboardDist = "";
    var branchDist = "";
    var distY = "";
    
    for(var i=0;i<positon.y;i++){
        ArtboardDist += selectedArtBoards[i].child.frame.width
    };
    branchDist = dist.branch*(positon.y+1);//branch需要多一个dist.branch

    distY = ArtboardDist + branchDist;

    return distY;
};

export default function onRun(context) {
    if(selectedPage && selectedArtBoards.length>0){//打开Webview
        openPannel();
    }else{//选择一个ArtBord
        sketch.UI.message("Please select an Page!")
    }
}

function openPannel() {//打开Webview
    const existingWebview = getWebview(identifier);
    if (existingWebview) {
        if (existingWebview.isVisible()) {
            // close the devtool if it's open
            existingWebview.close()
        }
    }

    let win = new BrowserWindow({
        identifier,
        width: 1350,
        height: 800,
        title:"Interact Logic UI",
        resizable:true,
        minimizable:true,
        maximizable:true,
        closable:true,
        alwaysOnTop: true
    });
    win.on('closed', () => {
        win = null
    });

    const Panel = `http://localhost:8000/interactLogic.html#${Math.random()}`;
    // const Panel = `http://localhost:8000/designsignifiers.html#${Math.random()}`;
    win.loadURL(Panel);

    // win.loadURL('http://whalexplorer.coding.me/whale-kit/designsignifiers.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(svgObj) {
        doSignifiers(svgObj);
        sketch.UI.message("Successfully inserted Signifiers into Artboard！");
        closeWin();
    });

    contents.on('closed', function(s) {
        closeWin();
    });

    // 向Webview传送selectedArtBoards数据
    setSelectedArtBoards(contents);
}


//向Webview传送selectedArtBoards数据
const setSelectedArtBoards = (contents) => {
    var serializData = doSerializData(selectedArtBoards);
    var selectedArtBoardsData = JSON.stringify(serializData);
    
    console.log("selectedArtBoards---" + selectedArtBoards);
    console.log("serializData---" + serializData);

    contents
        .executeJavaScript(`someGlobalFunctionDefinedInTheWebview(${selectedArtBoardsData})`)
        .then(res => {
            // do something with the result
            console.log("send data success,from plugin to webview!")
        })
};

//格式化selectedArtBoards数据
const doSerializData = (selectedArtBoards) => {
    var serializDatas = [];
    for(var i=0;i<selectedArtBoards.length;i++){
        console.log("item---" + selectedArtBoards);
        serializDatas.push({
            id: selectedArtBoards[i].id,
            artBoardId: selectedArtBoards[i].id,
            content: selectedArtBoards[i].name
        });
    };

    return serializDatas;
};


