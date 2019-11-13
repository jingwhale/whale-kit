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

const selectedPage = document.selectedPage;
const selectedArtBoards = selectedPage.layers;

var flowArtboard = "";
var flowBoards = [];
var dist = {};

const interactDescriptionWidth = 300;
const initPositnX = 60;
const initPositnY = 100;

const createPageAndArtboard = (data) =>{//创建交互流程页面与Artboard
    var flowPage = new Page({
        name: '交互流程',
        parent: document
      })

      var flowArtboardFrame = getFlowArtboardFrame();
      
      var flowFrame = {
          x:0,
          y:0,
          width:flowArtboardFrame.width+interactDescriptionWidth+initPositnX*2,
          height: flowArtboardFrame.height+initPositnY*2
      };
      
      flowArtboard = new Artboard({
        name: '交互流程',
        parent:flowPage,
        frame:flowFrame
      })

      makeInteractLogic();
};

const getFlowArtboardFrame = (data) =>{//计算flowArtboard的frame
    var maxY = 0;
    var maxYIndex = 0;
    var widthFrame = 0;
    var heightFrame = 0;
    var widthFrameBoard = 0;
    var heightFrameBoard = 0;
    for(var i=0;i<flowBoards.length;i++){
        var flowBoardInst = findArtBoardById(flowBoards[i].list[0].abId);
        widthFrameBoard += flowBoardInst.frame.width;

        if(flowBoards[i].length>maxY){
            maxY = flowBoards[i].length;
            maxYIndex = i;
        }
    };

    widthFrame = widthFrameBoard + (flowBoards.length-1)*dist.step

    var maxYList = flowBoards[maxYIndex].list;
    for(var j=0;j<maxYList.length;j++){
        var flowBoardInst = findArtBoardById(maxYList[j].abId);
        heightFrameBoard += flowBoardInst.frame.height;
    };

    heightFrame = heightFrameBoard + (maxYList.length-1)*dist.branch;

    return {width:widthFrame, height:heightFrame}
};

const makeInteractLogic = () =>{//建立交互流程
    var abId = "";
    var positonIndex = {};
    for(var i=0;i<flowBoards.length;i++){
        if(flowBoards[i].list.length >0){
            var child = flowBoards[i].list;
            for(var j=0;j<child.length;j++){
                abId = child[j].abId;
                positonIndex = {
                    x:i,
                    y:j
                };
                doPageFlow(abId,positonIndex);
            };
        }
    };
};

const doPageFlow = (abId,positon) =>{//移动页面到flowArtboard
    console.log("start---"+positon.x+"---"+positon.y);
    console.log("abId---"+abId);
    var currentArtboard = findArtBoardById(abId);

    //创建移动新组，包含当前Artboard和当前Artboard的框
    const flowGroup = new Group({
        name: currentArtboard.name,
        frame: getCurrentArtboardFrame(positon,currentArtboard)
    });

    //拷贝当前Artboard
    var copyBoard = currentArtboard.duplicate();
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

const findArtBoardById = (abId) =>{//通过abId查找artBoard
    console.log(abId);
    for(var i=0;i<selectedArtBoards.length;i++){
        if(selectedArtBoards[i].id === abId){
            console.log(selectedArtBoards[i]);
            return selectedArtBoards[i];
        }
    };
};

const getCurrentArtboardFrame = (positon,currentArtboard) =>{//获取当前Artboard在flowArtboard的位置，frame参数
    var frame = {
        x:initPositnX,
        y:initPositnY,
        width:currentArtboard.frame.width,
        height:currentArtboard.frame.height
    }
    frame.x = getCurrentArtboardFrameX(positon,currentArtboard)+initPositnX;
    frame.y = getCurrentArtboardFrameY(positon,currentArtboard)+initPositnY;

    return frame;
};

const getCurrentArtboardFrameX = (positon) =>{//获取当前Artboard在flowArtboard的位置，frame x参数
    var ArtboardDist = 0;
    var stepDist = 0;
    var distX = 0;
    console.log("getCurrentArtboardFrameX----"+positon.x+"---"+positon.y);
    for(var i=0;i<positon.x;i++){
        var artboardItemId = flowBoards[i].list[0].abId;
        console.log(artboardItemId);
        var artboardItem = findArtBoardById(artboardItemId);
        ArtboardDist += artboardItem.frame.width//每一列的第一个元素
    };
    stepDist = dist.step*positon.x;

    distX = ArtboardDist + stepDist;

    return distX;
};

const getCurrentArtboardFrameY = (positon) =>{//获取当前Artboard在flowArtboard的位置，frame y参数
    var ArtboardDist = 0;
    var branchDist = 0;
    var distY = 0;
    console.log("getCurrentArtboardFrameY----"+positon.x+"---"+positon.y);
    console.log("--start flowBoards---");
    for(var i=0;i<flowBoards.length;i++){
        if(flowBoards[i].list.length >0){
            var child = flowBoards[i].list;
            for(var j=0;j<child.length;j++){
                console.log(child[j].abId);
            };
        }
    };
    console.log("--end---");

    console.log("--start columnList---");
    var positonX = positon.x;
    var positonY = positon.y;
    var column = flowBoards[positonX];
    var columnList = column.list;
    for(var i=0;i<columnList.length;i++){
        console.log(columnList[i].abId);
        console.log(columnList[i].id);
        console.log(columnList[i].content);
    };
    console.log("--end---");

    var positonX = positon.x;
    var positonY = positon.y;
    for(var i=0;i<positonY;i++){
        var column = flowBoards[positonX];
        var columnList = column.list;
        var artboardItemId = columnList[i].abId;
        console.log("columnList--"+columnList);
        console.log("columnList[i]--"+columnList[i]);
        console.log("columnList[i].abId--"+columnList[i].abId);
        console.log(artboardItemId);
        var artboardItem = findArtBoardById(artboardItemId);
        ArtboardDist += artboardItem.frame.height;
    };

    branchDist = dist.branch*positon.y;

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
    contents.on('fromwebview', function(data) {
        dist = data.dist;
        console.log("赋值distx---"+dist.step);
        console.log("赋值disty---"+dist.branch);
        console.log("赋值flowName---"+dist.flowName);
        flowBoards = data.items;
        console.log("--赋值 flowBoards---");
        for(var i=0;i<flowBoards.length;i++){
            if(flowBoards[i].list.length >0){
                var child = flowBoards[i].list;
                for(var j=0;j<child.length;j++){
                    console.log(child[j].abId);
                    console.log(child[j].id);
                    console.log(child[j].content);
                };
            }
        };
        console.log("--end---");
        createPageAndArtboard(data);
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
        serializDatas.push({
            id: selectedArtBoards[i].id,
            abId: selectedArtBoards[i].id,
            content: selectedArtBoards[i].name
        });
    };

    return serializDatas;
};


