import React, { PureComponent } from 'react';
import { Tabs, Icon, Drawer, Button} from 'antd';
import Clipboard from 'clipboard';
import styles from './index.css';
import MainFormUI from './component/mainForm/index.js';
import ComponentFormUI from './component/componentForm/index.js';
import AboutAndHelpUI from './component/aboutAndHelp/index.js';
import Designsignifiers from './component/designsignifiers.js';
import DesignsignifiersX from './component/designsignifiersx.js';

const TabPane = Tabs.TabPane;

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      svgObj:"",
      drawerVisible:false,
      drawerPlacement:"right",
      svgType:"",
      sketchFalg: false,
      buttonValue:"下载SVG"
    };
  };

  componentDidMount(){
    var that = this;
    window.onbeforeunload = function(){
      return "message"
    };

    //监听plugin,sketchFalg
    window.someGlobalFunctionDefinedInTheWebview = function(data) {
      console.log(data.flag)
      var buttonValue = (that.state.svgType == "page") ? "插入页面说明" : "插入交互说明";
      that.setState({
        sketchFalg: data.flag,
        buttonValue: buttonValue
      });
    };
  }

  handleEmail = (value,type) =>{
    var svgObj = {};
    if(type == "page"){
      svgObj = DesignsignifiersX(value,type);
    }else{
      svgObj = Designsignifiers(value,type);
    }

    var drawerPlacement = "";
    if(type=="page"){
      drawerPlacement = "bottom"
    }else{
      drawerPlacement = "right"
    }

    this.setState({
      drawerPlacement:drawerPlacement
    });

    this.setState({
      drawerVisible:true,
      svgObj: svgObj,
      svgType: type
    });

    var clipboardBtn = new Clipboard(".svgXml-btn");

    return svgObj;
  };

  onDrawerClose = (e) => {
    this.setState({
      drawerVisible:false
    });
  };

  downloadSVG = (e) => {
    console.log("running downloadSVG()");
    const svgContent = this.state.svgObj.svgXml,
    blob = new Blob([svgContent], {
      type: "image/svg+xml"
    });
    var url = window.URL.createObjectURL(blob);
    var link = e.target;

    link.target = "_blank";
    if(this.state.svgType == "page"){
      link.download = "页面说明.svg";
    }else{
      link.download = "交互说明.svg";
    }

    link.href = url;
  };

  makeSignifiers = () => {
    window.postMessage('fromwebview', this.state.svgObj);
    console.log(this.state.svgObj)
  };

  doSVG = (e) =>{
    if(this.state.sketchFalg){
      this.makeSignifiers();
    }else{
      this.downloadSVG(e);
    }
  };

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.icon}>
          <a href="https://www.jingwhale.cc/" target="_blank"><Icon type="home" /></a>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.tab}>
          <TabPane tab="页面标注" key="1">
            <div className={styles.tabContent}>
              <MainFormUI  id="MainFormUI" handleEmail={this.handleEmail.bind(this)}/>
            </div>
          </TabPane>
          <TabPane tab="组件标注" key="2">
            <div className={styles.tabContent}>
              <ComponentFormUI  id="ComponentFormUI" handleEmail={this.handleEmail.bind(this)}/>
            </div>
          </TabPane>
          <TabPane tab="帮助" key="3">
            <div className={styles.tabContent}>
              <AboutAndHelpUI  id="AboutAndHelpUI" />
            </div>
          </TabPane>
        </Tabs>
        <Drawer
          width={666}
          placement={this.state.drawerPlacement}
          closable={true}
          onClose={this.onDrawerClose}
          visible={this.state.drawerVisible}
        >
          <div id="svgXml-target" dangerouslySetInnerHTML={{ __html: this.state.svgObj.svgXml}}></div>
          <div className={styles.button}>
            <a herf="#" type="primary" onClick={this.doSVG}>{this.state.buttonValue}</a>
            <span className={styles.copyBtn}></span>
            <a class="svgXml-btn" data-clipboard-target="#svgXml-target">复制内容</a>
          </div>
        </Drawer>
        <div className={styles.footer}>Designed and Coded by © Jingwhale</div>
      </div>
    );
  }
}

