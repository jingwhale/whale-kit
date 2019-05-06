var lastY = 20;
const lineHeight = 20;
const svgHead = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="2000">';
const caption = '<text font-size="15" x="10" y="20" fill="#000">交互说明：</text>';
const svgTail = '</svg>';
const Heading1 = 'Heading1';
const Heading2 = 'Heading2';
const lineWidth = 50;


const designsignifiers = (values,type) =>{
  var templateString = "";
  switch (type) {
    case "page":
      templateString = pageSignifiers(values);
      break;
    case "component":
      componentSignifiers(values);
      break;
  };
  return templateString;
};

const getBLen = function(str) {//一个汉字2个字符
  if (str == null) return 0;
  if (typeof str != "string"){
    str += "";
  }
  return str.replace(/[^\x00-\xff]/g,"01").length;
};

const formatData = (values) =>{
  var titleObj = [
    {
      title:"页面Url",
      value:values.url
    },
    {
      title:"页面Title",
      value:values.title
    },
    {
      title:"页面Ico",
      value:values.ico
    },
    {
      flag:true,
      title:"页面SEO",
      value:[
        {
          title:"SEO-Keywords",
          value:values.keywords
        },
        {
          title:"SEO-Description",
          value:values.description
        }
      ]
    },
    {
      flag:true,
      title:"页面状态",
      value:[
        {
          title:"页面状态",
          value:values.state
        },
        {
          title:"页面状态描述",
          value:values.stateDescription
        },
      ]
    },
    {
      flag:true,
      title:"页面跳转",
      value:[
        {
          title:"页面的入口",
          value:values.linkin
        },
        {
          title:"页面的出口",
          value:values.linkout
        },
      ]
    },
    {
      title:"页面权限",
      value:values.permission
    },
    {
      title:"兼容性",
      value:values.compatibility
    },
    {
      title:"其他",
      value:values.other
    }
  ];
  return titleObj;
};

const pageSignifiers  = (values) =>{
  var svgData = formatData(values);

  return getSvgXml(svgData);
};

const svgContent = (svgData,HeadType) => {
  var svg = '';

  svgData.forEach((value,index) => {
    svg += svgString(value,index,HeadType);
    console.log(index);
  });

  return svg;
};

const getSvgXml = (svgData) => {
  var svg = svgContent(svgData,Heading1);

  var svgXml = svgHead + caption + svg + svgTail;

  lastY = 0;

  return svgXml;
};


const svgString = (value,index,HeadType) => {
  var svgString = "";
  var textHeadString = "";
  var textContentString = "";

  textHeadString = textHead(value,index,HeadType);

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

const textHead = (value,index,HeadType) => {
  var order = (HeadType=="Heading1") ? (index+1+'、'):(index+1+'）、');
  var title = order + value.title;
  var distY = (HeadType==Heading1)?(lastY+lineHeight*2):(lastY+lineHeight);
  lastY = distY;
  var head = '<text font-size="14" x="10" y='+'"'+distY+'"'+' fill="#333">'+title+'</text>';
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

  if(getBLen(cnt)>lineWidth){
    content = wrapWord(cnt,distY);
  }else{
    var distY = lastY+lineHeight;
    lastY = distY;
    content = '<text font-size="14" x="10" y='+'"'+distY+'"'+' fill="#666">'+cnt+'</text>';
  }

  return content;
};

const wrapWord = (cnt) => {
  var textStringHead = '<text font-size="14" x="10" y='+'"'+lastY+'"'+' fill="#666">';
  var textStringTail = '</text>';
  var wrapTspan = "";
  var total = getBLen(cnt);
  var lineNum = Math.ceil(total/lineWidth);
  for(var i=0;i<lineNum;i++){
    var tspnCnt = cnt.substring(i*lineWidth, (i+1)*lineWidth);
    if(!!tspnCnt){
      var tspnDistY = lastY+lineHeight;
      lastY = tspnDistY;
      wrapTspan += '<tspan x="10" y='+'"'+tspnDistY+'"'+'>'+tspnCnt+'</tspan>';
    }
  }

  return (textStringHead+wrapTspan+textStringTail);
};


const componentSignifiers = (values) =>{

};

export default designsignifiers;
