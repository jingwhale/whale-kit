import sketch from 'sketch';
import Sketch from 'sketch/dom';
import BrowserWindow from "sketch-module-web-view";
import {identifier} from "./lib/config";
import {getWebview} from 'sketch-module-web-view/remote';
var Settings = require('sketch/settings')


const Group = Sketch.Group;
const Document = Sketch.Document;
const Rectangle = Sketch.Rectangle;
const ShapePath = Sketch.ShapePath;
const Text = Sketch.Text;
const Artboard = Sketch.Artboard;
const Page = Sketch.Page;
const document = Document.getSelectedDocument();

const selectedPage = document.selectedPage;
const selectedArtBoards = selectedPage.layers;
const allPages = document.pages;

const settingFlowKey = "settingFlowKey";
var settingFlowData = [];

var flowArtboard = "";
var flowBoards = [];
var dist = {};
var flowName = "交互流程";
var hasFlowPage = false;

const interactDescriptionWidth = 0;
const initPositnX = 100;
const initPositnY = 100;

const flowArtBoardTilteHeight = 140;
const flowArtBoardTilteMarginBottom = 80;
var titleFontSize = 40;
var flowNameFontSize = 16;
var flowNameDist = 12;
var flowNameColor = "#333";
var titleBold = 600;
var titleColor = "#fff";


const createPageAndArtboard = () =>{//创建交互流程页面与Artboard
    var flowPage = doPage();

    var flowArtboardFrame = getFlowArtboardFrame();
    var newArtBordFrameX = doNewArtBordFrameX(flowPage);
    var flowFrame = {
        x:newArtBordFrameX,
        y:0,
        width:flowArtboardFrame.width+interactDescriptionWidth+initPositnX*2,
        height: flowArtboardFrame.height+flowArtBoardTilteHeight+flowArtBoardTilteMarginBottom*2
    };
    
    flowArtboard = new Artboard({
    name: flowName,
    parent:flowPage,
    frame:flowFrame
    })
    //建立title
    createPageAndArtboardTitle();

    //建立交互流程
    makeInteractLogic();
};

const doNewArtBordFrameX = (flowPage) =>{//设置flowArtBord的frame.x 
    var artBordMaxX = 0;
    var artBordMaxXWidth = 0;
    var flowPageLayers = flowPage.layers;
    if(flowPageLayers.length>0){
        artBordMaxX = flowPageLayers[0].frame.x;
        artBordMaxXWidth = flowPageLayers[0].frame.x + flowPageLayers[0].frame.width + 100;
        for(var i=0;i<flowPageLayers.length;i++){
            if(flowPageLayers[i].frame.x > artBordMaxX){
                artBordMaxX = flowPageLayers[i].frame.x;
                artBordMaxXWidth = flowPageLayers[i].frame.x + flowPageLayers[i].frame.width + 100;
            }
        }; 
    }

    return artBordMaxXWidth;
};

const doPage = () =>{//判断是否有“交互流程”的页面
    var flowPageItem = "";
    for(var i=0;i<allPages.length;i++){
        if(allPages[i].name === "交互流程"){
            flowPageItem = allPages[i];
            hasFlowPage = true;
            break;
        }
    };

    if(!flowPageItem){
        flowPageItem = new Page({
            name: '交互流程',
            parent: document
        });
    }

    return flowPageItem;
};

const createPageAndArtboardTitle = () =>{//创建交互流程artboard的title
    //Title Group
    var titleGroup = new Group({
        name: "Title",
        parent:flowArtboard
    });

    //Title 背景框bg
    // var rectTitleFrame = new Rectangle(0, 0, flowArtboard.frame.width, flowArtBoardTilteHeight);
    const rectTitleBg = new ShapePath({
        name: "title",
        frame:{
            x:0,
            y:0,
            width:flowArtboard.frame.width,
            height: flowArtBoardTilteHeight
        },
        shapeType: ShapePath.ShapeType.Rectangle,
        parent:titleGroup,
        style:{
            fills:[{color:'#000'}]
        }
    })

    //Title text
    const titleText = new Text({
        text: flowName,
        frame: {
            x:initPositnX,
            y:42,
            width:300,
            height:titleFontSize
        },
        parent: titleGroup,
        name: "title/name"
    });

    titleText.style.fontSize = titleFontSize;
    titleText.style.fontWeight = titleBold;
    titleText.style.textColor = titleColor;
};

const getFlowArtboardFrame = (data) =>{//计算flowArtboard的frame
    var maxY = 0;
    var maxYIndex = 0;
    var widthFrame = 0;
    var heightFrame = 0;
    var widthFrameBoard = 0;
    var heightFrameBoard = 0;
    var flowArtboardFrame =  {};
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

    flowArtboardFrame = {width:widthFrame, height:heightFrame};

    return flowArtboardFrame
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
                
                doPageFlow(abId,positonIndex,child[j].fillType);
            };
        }
    };
};

const doPageFlow = (abId,positon,fillType) =>{//移动页面到flowArtboard
    var currentArtboard = findArtBoardById(abId);

    //创建移动新组，包含当前Artboard和当前Artboard的框
    const flowGroup = new Group({
        name: currentArtboard.name,
        frame: getCurrentArtboardFrame(positon,currentArtboard)
    });
    if(!fillType){
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

        // const artBoardGroup = new Group({
        //     name: currentArtboard.name,
        //     frame: copyBoard.frame,
        //     layers: copyBoard.layers
        // });

        // artBoardGroup.parent = flowGroup;
        // copyBoard.delete();

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
        
        //Title text
        const flowNameText = new Text({
            text: copyBoard.name,
            frame: {
                x:rectBgFrame.x,
                y:rectBgFrame.y-flowNameFontSize-flowNameDist,
                width:88,
                height:flowNameFontSize
            },
            parent: flowGroup,
            name: copyBoard.name
        });
        flowNameText.style.fontSize = flowNameFontSize;
        flowNameText.style.lineHeight = flowNameFontSize;
        flowNameText.style.textColor = flowNameColor;
        
        //将flowGroup移动到flowArtboard中
        flowGroup.parent = flowArtboard;
    }
    
};

const findArtBoardById = (abId) =>{//通过abId查找artBoard
    for(var i=0;i<selectedArtBoards.length;i++){
        if(selectedArtBoards[i].id === abId){
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
    frame.y = getCurrentArtboardFrameY(positon,currentArtboard)+flowArtBoardTilteHeight+flowArtBoardTilteMarginBottom;

    return frame;
};

const getCurrentArtboardFrameX = (positon) =>{//获取当前Artboard在flowArtboard的位置，frame x参数
    var ArtboardDist = 0;
    var stepDist = 0;
    var distX = 0;
    for(var i=0;i<positon.x;i++){
        var artboardItemId = flowBoards[i].list[0].abId;
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
    var positonX = positon.x;
    var positonY = positon.y;
    var column = flowBoards[positonX];
    var columnList = column.list;

    var positonX = positon.x;
    var positonY = positon.y;
    for(var i=0;i<positonY;i++){
        var column = flowBoards[positonX];
        var columnList = column.list;
        var artboardItemId = columnList[i].abId;
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
    }else{//选择一个ArtBoard
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
    win.loadURL(Panel);

    // win.loadURL('http://www.jingwhale.com/whalekit/interactLogic.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(data) {
        console.log("data.checkSave---"+data)
        if(data.type === "updateFlowData"){
            settingFlowData = data.settingFlowData || [];
            Settings.setDocumentSettingForKey(document, settingFlowKey, settingFlowData);
        }else if(data.type === "doFlow"){
            dist = data.dist;
            dist.branch = dist.step;
            flowBoards = data.items;
            flowName = data.flowName || "交互流程";
            createPageAndArtboard();
            sketch.UI.message("Successfully flowed pages！");

            settingFlowData = data.settingFlowData || [];

            if(!!data.checkSave){
                var settingFlowDataItem = {
                    id: 'flow' + (new Date()).getTime(),
                    name:flowName,
                    items:data.items
                };

                settingFlowData.unshift(settingFlowDataItem);
                Settings.setDocumentSettingForKey(document, settingFlowKey, settingFlowData);
            }
            closeWin();
        }
    });

    contents.on('closed', function(s) {
        closeWin();
    });

    // 向Webview传送selectedArtBoards数据
    setSelectedArtBoards(contents);
}


//向Webview传送selectedArtBoards数据
const setSelectedArtBoards = (contents) => {
    var treeBook = doSerializData(selectedArtBoards);
    settingFlowData = Settings.documentSettingForKey(document, settingFlowKey) || [];
    var setData = [];
    setData.push(treeBook);
    setData.push(settingFlowData);

    var selectedArtBoardsData = JSON.stringify(setData);

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
            content: selectedArtBoards[i].name,
            fillType: selectedArtBoards[i].fillType || false
        });
    };

    return serializDatas;
};


