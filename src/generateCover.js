import sketch from 'sketch';
import {identifier} from "./lib/config";
import {getWebview} from "sketch-module-web-view/remote";
import BrowserWindow from "sketch-module-web-view";
const Rectangle = require('sketch/dom').Rectangle;
const Text = require('sketch/dom').Text;
const Group = require('sketch/dom').Group;
const Shape = require('sketch/dom').Shape;

var doc = sketch.getSelectedDocument();
var selection = doc.selectedLayers;
var page = doc.selectedPage;
var artboard = "";
selection.forEach(layer => (artboard=layer));

var artboardFrame = artboard.frame;

var coverName = "封面";
var normalColor = "#4A4A4A";
var lightColor = "#666";
var secondColor = "#58595B";
var boardColor = "#999";

export default function onRun(context) {
    if(artboard && artboard.type=="Artboard"){
        openPannel();
    }else{//选择一个ArtBord
        sketch.UI.message("Please select an ArtBord!")
    }
}

function openPannel() {
    const existingWebview = getWebview(identifier);
    if (existingWebview) {
        if (existingWebview.isVisible()) {
            // close the devtool if it's open
            existingWebview.close()
        }
    }

    let win = new BrowserWindow({
        identifier,
        width: 408,
        height: 291,
        title:"Generate Cover UI",
        resizable:false,
        minimizable:false,
        maximizable:false,
        closable:true,
        alwaysOnTop: true
    });
    win.on('closed', () => {
        win = null
    });
    // const Panel = `http://localhost:8000/generatecover.html#${Math.random()}`;
    // win.loadURL(Panel);

    win.loadURL('http://whalexplorer.coding.me/whale-kit/generatecover.html?'+Math.random());

    const closeWin = () =>{
        win.destroy();
        win.close();
    };

    var contents = win.webContents;

    //监听webview的事件：webview->plugin
    contents.on('fromwebview', function(data) {
        var setting = data || getDefaultSettings();
        setting.time = getDate();
        generateHeader(setting);
        generateContent(setting);

        artboard.name = coverName;
        page.name = coverName;

        sketch.UI.message("Successfully screenshot and insert into Artboard！");
        closeWin();
    });

    contents.on('closed', function(s) {
        closeWin();
    });
}

function generateHeader(setting) {
    var headRect = {
        x:artboardFrame.width*0.05/2,
        y:20,
        width:artboardFrame.width*0.95,
        height:40
    };

    const rect = new Rectangle(headRect.x,headRect.y,headRect.width,headRect.height);
    //Create Body(Group)
    const group = new Group({
        name: 'header',
        parent:artboard,
        frame: rect
    });

    //Create header(Group)
    const shape = new Shape({
        parent: group,
        name: "header/layout",
        frame: {
            x:0,
            y:0,
            width:rect.width,
            height:rect.height
        },
        style: {
            borders: [{ color: boardColor }]
        },
    });

    //Create header(Group)-header/projectName
    const projectName = new Text({
        text: setting.projectName,
        alignment: Text.Alignment.center,
        frame: {
            x:headRect.width/3,
            y:5,
            width:headRect.width/3,
            height:12
        },
        parent: group,
        name: "header/projectName"
    });

    projectName.style.textColor = normalColor;
    projectName.style.verticalAlignment = "center";
    projectName.style.fontSize = 12;
    projectName.style.lineHeight = 14;

    //Create header(Group)-header/projectModule
    const projectModule = new Text({
        text: setting.projectModule,
        alignment: Text.Alignment.center,
        frame: {
            x:headRect.width/3,
            y:5+14+3,
            width:headRect.width/3,
            height:12
        },
        parent: group,
        name: "header/projectModule"
    });

    projectModule.style.textColor = secondColor;
    projectModule.style.fontWeight = "700";
    projectModule.style.verticalAlignment = "center";
    projectModule.style.fontSize = 12;
    projectModule.style.lineHeight = 14;

    //Create header(Group)-header/timeTitle
    const timeTitle = new Text({
        text: 'Last Modified',
        frame: {
            x:headRect.width-80,
            y:9,
            width:60,
            height:10
        },
        parent: group,
        name: "header/timeTitle"
    });

    timeTitle.style.textColor = lightColor;
    timeTitle.style.verticalAlignment = "center";
    timeTitle.style.fontSize = 8;
    timeTitle.style.lineHeight = 10;

    //Create header(Group)-header/time
    const time = new Text({
        text: setting.time,
        frame: {
            x:headRect.width-80,
            y:9+13,
            width:60,
            height:10
        },
        parent: group,
        name: "header/time"
    });

    time.style.textColor = lightColor;
    time.style.fontWeight = "700";
    time.style.verticalAlignment = "center";
    time.style.fontSize = 9;
    time.style.lineHeight = 10;

    //Create header(Group)-header/version
    const version = new Text({
        text: setting.version,
        alignment: Text.Alignment.center,
        frame: {
            x:headRect.width-150,
            y:9+10,
            width:60,
            height:10
        },
        parent: group,
        name: "header/version"
    });

    version.style.textColor = lightColor;
    version.style.fontWeight = "700";
    version.style.verticalAlignment = "center";
    version.style.fontSize = 12;
    version.style.lineHeight = 12;

    //Create header(Group)-header/versionText
    const versionText = new Text({
        text: "Version",
        alignment: Text.Alignment.center,
        frame: {
            x:headRect.width-156-version.frame.width,
            y:9+12,
            width:60,
            height:10
        },
        parent: group,
        name: "header/versionText"
    });

    versionText.style.textColor = lightColor;
    versionText.style.verticalAlignment = "center";
    versionText.style.fontSize = 8;
    versionText.style.lineHeight = 8;
}

function generateContent(setting) {
    var contentRect = {
        x:0,
        y:artboardFrame.height/4,
        width:artboardFrame.width,
        height:500
    };

    const rect = new Rectangle(contentRect.x,contentRect.y,contentRect.width,contentRect.height);

    //Create content(Group)
    const groupContent = new Group({
        name: 'content',
        parent:artboard,
        frame: rect
    });


    const projectNameRect = new Rectangle(0,contentRect.height/4,contentRect.width,46);
    //Create content(Group)-content/projectModule
    const projectName = new Text({
        text: setting.projectModule,
        alignment: Text.Alignment.center,
        frame: projectNameRect,
        parent: groupContent,
        name: "content/projectModule"
    });

    projectName.style.textColor = normalColor;
    projectName.style.fontWeight = "700";
    projectName.style.verticalAlignment = "center";
    projectName.style.fontSize = 46;

    //Create content(Group)-content/projectDec
    const projectDec = new Text({
        text: "交互方案",
        alignment: Text.Alignment.center,
        frame: {
            x:projectName.frame.x,
            y:projectName.frame.y+43+38,
            width:projectName.frame.width,
            height:20
        },
        parent: groupContent,
        name: "content/projectDec"
    });
    projectDec.style.textColor = normalColor;
    projectDec.style.verticalAlignment = "center";
    projectDec.style.fontSize = 20;

    //Create content(Group)-content/projectParticipants
    const projectParticipants = new Text({
        text: setting.participants,
        alignment: Text.Alignment.center,
        frame: {
            x:projectName.frame.x,
            y:projectDec.frame.y+20+24,
            width:projectName.frame.width,
            height:14
        },
        parent: groupContent,
        name: "content/projectParticipants"
    });
    projectParticipants.style.textColor = normalColor;
    projectParticipants.style.verticalAlignment = "center";
    projectParticipants.style.fontSize = 14;
}

function getDefaultSettings(){//默认设置
  return {
		projectName: "项目名称",
		projectModule: "项目模块",
		version: "1.0",
        participants: "JINGWHALE"
	}
}

function getDate() {//获取当前时间
    var myDate = new Date();
    var myMonth = myDate.getMonth()+1;
    var month  = myMonth>9 ? myMonth : ("0"+myMonth);

    return myDate.getFullYear() + "-" + month + "-" + myDate.getDate();
}

