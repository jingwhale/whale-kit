import { pageDataTemplate, getDataFormTemplate, changeDataFormTemplate, showDataFormTemplate, functionDataFormTemplate } from "./signifiersTemplate.js";

const defaultLastY = 16;
var lastY = JSON.parse(JSON.stringify(defaultLastY));

const defaultLastX = -130;
var lastX = JSON.parse(JSON.stringify(defaultLastX));

const lineWidth = 205;
const lineHeight = 20;
const svgTail = '</svg>';
const Heading1 = 'Heading1';
const Heading2 = 'Heading2';
const lineWidthCount = 15;


const designsignifiers = (values,type) =>{
  var templateString = "";
  switch (type) {
    case "page":
      templateString = pageSignifiers(values,type);
      break;
    case "component":
      templateString = componentSignifiers(values,type);
      break;
  }
  return templateString;
};

const isURL = (strUrl) => {// 验证url
  var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  var re = new RegExp(strRegex);
  return re.test(strUrl);
}

const svgHead = () =>{
  var svgHeight = 200;
  var svgHeadString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1266" height=' + '"'+svgHeight+ '"'+'>';
  return svgHeadString;
};

const caption = (type) =>{
  var captionTitle = (type=="page") ? "页面说明" : "交互说明";
  var captionString = '<text font-size="15" x="0" y="16" fill="#000">'+captionTitle+'</text>';
  return captionString;
};

const getBLen = function(val) {//一个汉字2个字符
  var str = new String(val);
  var bytesCount = 0;
  for (var i = 0 ,n = str.length; i < n; i++) {
    var c = str.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
      bytesCount += 1;
    } else {
      bytesCount += 2;
    }
  }
  return bytesCount;
};

const pageSignifiers  = (values,type) =>{
  var svgData = pageDataTemplate(values);

  return getSvgXml(svgData,type);
};

const svgContent = (svgData,HeadType) => {
  var svg = '';

  svgData.forEach((value,index) => {
    svg += svgString(value,index,HeadType);
  });

  return svg;
};

const getSvgXml = (svgData,type) => {
  var svg = svgContent(svgData,Heading1);

  var svgXml = svgHead() + caption(type) + svg + svgTail;

  lastY = defaultLastY;
  lastX = defaultLastX;

  var size = {
    width:1266,
    height: 200
  };

  var svg  = {
    svgXml: svgXml,
    size: size,
    type: type
  };

  return svg;
};


const svgString = (value,index,HeadType) => {
  var svgString = "";
  var textHeadString = "";
  var textContentString = "";

  if(HeadType == "Heading1"){
    textHeadString = textHead1(value,index,HeadType);
  }else{
    textHeadString = textHead2(value,index,HeadType);
  }


  if(value.value!='undefined'){
    if(value.flag){
      textContentString = svgContent(value.value,Heading2);
    }else{
      textContentString = textContent(value,index);
    }
  }else{
    textContentString = "---";
  }

  svgString = textHeadString + textContentString;

  return svgString;
};

const textHead1 = (value,index,HeadType) => {
  var order = '▪ ';
  var fontSize = 14;
  var title = order + value.title;
  var distY = JSON.parse(JSON.stringify(defaultLastY));
  lastY = distY;
  var distX = lastX+lineWidth;
  lastX = distX;
  var head = '<text font-size='+'"'+fontSize+'"'+' x="'+distX+'" y='+'"'+distY+'"'+' fill="#333">'+title+'</text>';
  return head;
};

const textHead2 = (value,index,HeadType) => {
  var order = index+1+')、';
  var fontSize = 12;
  var title = order + value.title;
  var distX = lastX;
  var distY = lastY+lineHeight;
  lastY = distY;

  var head = '<text font-size='+'"'+fontSize+'"'+' x="'+distX+'" y='+'"'+distY+'"'+' fill="#333">'+title+'</text>';
  return head;
};

const textContent = (value,index) => {
  var cnt = '- ';
  var content = '';
  if(Object.prototype.toString.call(value.value) == '[object Object]'){
    value.value.forEach((value,index) => {
      cnt += value;
      cnt += ';';
    });
  }else{
    cnt += value.value;
  }

  var newLineWidthCount = "";
  if(isURL(value.value)){
    newLineWidthCount = JSON.parse(JSON.stringify(lineWidthCount))*2;
  }else{
    newLineWidthCount = JSON.parse(JSON.stringify(lineWidthCount));
  }

  if(getBLen(cnt)>newLineWidthCount){
    content = wrapWord(cnt,value.value,distY);
  }else{
    var distY = lastY+lineHeight;
    lastY = distY;
    var distX = lastX;
    content = '<text font-size="12" x="'+distX+'" y='+'"'+distY+'"'+' fill="#666">'+cnt+'</text>';
  }

  return content;
};

const wrapWord = (cnt,value) => {
  var distX = lastX;
  var textStringHead = '<text font-size="12" x="'+distX+'" y='+'"'+lastY+'"'+' fill="#666">';
  var textStringTail = '</text>';
  var wrapTspan = "";
  var total = getBLen(cnt);
  var newLineWidthCount = "";
  if(isURL(value)){
    newLineWidthCount = JSON.parse(JSON.stringify(lineWidthCount))*2;
  }else{
    newLineWidthCount = JSON.parse(JSON.stringify(lineWidthCount));
  }
  var lineNum = Math.ceil(total/newLineWidthCount);
  for(var i=0;i<lineNum;i++){
    var tspnCnt = cnt.substring(i*newLineWidthCount, (i+1)*newLineWidthCount);
    if(!!tspnCnt){
      var tspnDistY = lastY+lineHeight;
      lastY = tspnDistY;
      wrapTspan += '<tspan x="'+distX+'" y='+'"'+tspnDistY+'"'+'>'+tspnCnt+'</tspan>';
    }
  }

  return (textStringHead+wrapTspan+textStringTail);
};


const componentSignifiers = (values,type) =>{
  var svgData = [];

  values.forEach((value,index) => {
    var ceilData = {};
    if(!value.flagDel){
      switch (value.type) {
        case '获得数据':
          ceilData = getDataFormTemplate(value);
          break;
        case '改变数据项':
          ceilData = changeDataFormTemplate(value);
          break;
        case '展示数据':
          ceilData = showDataFormTemplate(value);
          break;
        case '功能':
          ceilData = functionDataFormTemplate(value);
          break;
        default:
          ceilData = getDataFormTemplate(value);
      }
      svgData.push(ceilData);
    }

  });

  return getSvgXml(svgData,type);
};

export default designsignifiers;
