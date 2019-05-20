import sketch from 'sketch';
const Text = require('sketch/dom').Text;
const Group = require('sketch/dom').Group;
import { ElementNameList } from "./lib/config";

var document = sketch.getSelectedDocument();
var selection = document.selectedLayers;
var page = document.selectedPage;
var artboard = "";
selection.forEach(layer => (artboard=layer));

var artboardFrame = artboard.frame;

var titleFontSize = 26;
var proverbColor = "#999999";

export default function onRun(context) {
    if(artboard && artboard.type=="Artboard"){
        choseElement();
    }else{//选择一个ArtBord
        sketch.UI.message("Please select an ArtBord!")
    }
}


const choseElement = function () {
    sketch.UI.getInputFromUser("Please select the text item you want to generate:", {
        type: sketch.UI.INPUT_TYPE.selection,
        possibleValues: ElementNameList
    }, (err, value) => {
        generateWritingFormat(value);
        if (err) {
            sketch.UI.message(err);
            return
        }
    });
};

const generateWritingFormat = function (value) {
    switch (value) {
        case "项目描述":
            generateElementTtile(value);
            break;
        case "交互约定":
            generateElementPromise(value);
            break;
        case "设计要素":
            generateElementPoint(value);
            break;
        case "致谢":
            generateElementThanks(value);
            break;
        case "版本记录":
            generateElementTtile(value);
            break;
        case "修订记录":
            generateElementTtile(value);
            break;
        default:
            generateElementTtile(value);
    }

    artboard.name = value;
};

var parentGroupFrame = {
    x: 46,
    y:46,
    width: 200,
    height: 15
};

//生成标题
const generateElementTtile = function (value,frame) {
    var titleFrame = frame ? frame : parentGroupFrame;
    var titleGroup = new Group({
        name: value+"标题",
        parent:artboard,
        frame: titleFrame
    });

    const titleText = new Text({
        text: value,
        alignment: Text.Alignment.center,
        frame: {
            x:0,
            y:0,
            width:200,
            height:26
        },
        parent: titleGroup,
        name: "title"
    });

    titleText.style.fontSize = titleFontSize;
};

//交互约定
const generateElementPromise = function (value,frame) {
    var promiseFrame = frame ? frame : parentGroupFrame;
    //交互约定
    var parentGroup = new Group({
        name: '交互约定',
        parent:artboard,
        frame: promiseFrame
    });

    const globalText = new Text({
        text: "全局约定",
        alignment: Text.Alignment.center,
        frame: {
            x:0,
            y:0,
            width:200,
            height:26
        },
        parent: parentGroup,
        name: "global"
    });

    globalText.style.fontSize = titleFontSize;

    const linkText = new Text({
        text: "https://whale-design.gitbook.io/whale-global-explanation/",
        frame: {
            x:globalText.frame.x,
            y:globalText.frame.y+50,
            width:200,
            height:20
        },
        parent: parentGroup,
        name: "urllink"
    });

    linkText.style.fontSize = 20;

    const jhText = new Text({
        text: "交互约定",
        frame: {
            x:globalText.frame.x,
            y:globalText.frame.y+130,
            width:200,
            height:26
        },
        parent: parentGroup,
        name: "interaction"
    });

    jhText.style.fontSize = titleFontSize;

    const jhTextCnt = new Text({
        text: "• 组件交互均与现有组件交互一致。未说明交互，均为组件默认。 \n" +
        "\n" +
        "• 页面交互异常在未说明情况下，均按照以下： \n" +
        "404：跳转到公用404页面。 \n" +
        "无网络：提示无网络或网速慢。 \n" +
        "无权限：跳转到公用无权限页面。 \n" +
        "\n" +
        "• 其他交互未尽事宜，请及时与设计师沟通。 ",
        frame: {
            x:globalText.frame.x,
            y:globalText.frame.y+130+50,
            width:960,
            height:600
        },
        parent: parentGroup,
        name: "jhTextCnt"
    });

    jhTextCnt.style.fontSize = 20;
    jhTextCnt.style.lineHeight = 32;
    // jhTextCnt.style.alignment = "left";

    const nameDefinitionText = new Text({
        text: "名词定义",
        frame: {
            x:0,
            y:globalText.frame.y+130+50+310,
            width:200,
            height:26
        },
        parent: parentGroup,
        name: "nameDefinition"
    });

    nameDefinitionText.style.fontSize = titleFontSize;
    // nameDefinitionText.style.alignment = "left";

    const nameDefinitionTextCnt = new Text({
        text: "• 分销\n" +
        "在西方经济学中，分销的含义是建立销售渠道的意思。\n" +
        "\n" +
        "• WC\n" +
        "WC是whale code的简写，中文名称为鲸鱼编程。",
        frame: {
            x:globalText.frame.x,
            y:globalText.frame.y+130+50+310+50,
            width:200,
            height:20
        },
        parent: parentGroup,
        name: "nameDefinitionCnt"
    });

    nameDefinitionTextCnt.style.fontSize = 20;
    nameDefinitionTextCnt.style.lineHeight = 32;
    // nameDefinitionTextCnt.style.alignment = "left";

};

//设计要素
const generateElementPoint = function (value) {
    var parentGroup = new Group({
        name: '设计要素标题',
        parent:artboard,
        frame: parentGroupFrame
    });

    const globalText = new Text({
        text: "设计要素",
        alignment: Text.Alignment.center,
        frame: {
            x:0,
            y:0,
            width:200,
            height:26
        },
        parent: parentGroup,
        name: "title"
    });

    globalText.style.fontSize = titleFontSize;

    const linkText = new Text({
        text: "https://github.com/jingwhale/whale-design-book",
        frame: {
            x:globalText.frame.x+120,
            y:globalText.frame.y+10,
            width:200,
            height:20
        },
        parent: parentGroup,
        name: "urllink"
    });
    linkText.style.fontSize = 18;
};


//致谢
const generateElementThanks = function (value) {
    var parentGroupFrame = {
        x: (artboardFrame.width-200)/2,
        y:200,
        width: 200,
        height: 38
    };
    var parentGroup = new Group({
        name: '致谢标题',
        parent:artboard,
        frame: parentGroupFrame
    });

    const globalText = new Text({
        text: "致谢",
        alignment: Text.Alignment.center,
        frame: {
            x:0,
            y:0,
            width:200,
            height:38
        },
        parent: parentGroup,
        name: "title"
    });

    globalText.style.fontSize = 38;
    globalText.style.fontWeight = "700";

    var parentGroup1 = new Group({
        name: '致谢内容',
        parent:artboard,
        frame: {
            x:(artboardFrame.width-600)/2,
            y:parentGroup.frame.height+150,
            width:600,
            height:200
        }
    });

    const global1Text = new Text({
        text: "首先，感谢设计团队专业的帮助。\n其次，感谢开发、视觉、运营团队的帮助与支持。\n希望我们可以做的更好！",
        alignment: Text.Alignment.center,
        frame: {
            x: 0,
            y:100,
            width:600,
            height:200
        },
        parent: parentGroup1,
        name: "thanksCnt"
    });

    global1Text.style.fontSize = titleFontSize;
    global1Text.style.alignment = "center";
    global1Text.style.lineHeight = 50;

    var parentGroup2 = new Group({
        name: '谚语',
        parent:artboard,
        frame: {
            x:artboardFrame.width-600,
            y:artboardFrame.height-120,
            width:600,
            height:200
        }
    });

    const global2Text = new Text({
        text: "凝聚产生力量；团结诞生希望。——席勒",
        alignment: Text.Alignment.center,
        frame: {
            x: 0,
            y:0,
            width:600,
            height:200
        },
        parent: parentGroup2,
        name: "proverb"
    });

    global2Text.style.fontSize = 20;
    global2Text.style.alignment = "center";
    global2Text.style.textColor = proverbColor;
};






