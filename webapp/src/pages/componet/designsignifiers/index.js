import React, { PureComponent } from 'react';
import { Tabs, Icon, Drawer, Button} from 'antd';
import styles from './index.css';
import MainFormUI from './component/mainForm/index.js';
import ComponentFormUI from './component/componentForm/index.js';
import AboutAndHelpUI from './component/aboutAndHelp/index.js';
import Designsignifiers from './component/designsignifiers.js';

const TabPane = Tabs.TabPane;

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      svgHtmlString:"",
      drawerVisible:false
    };
  };

  componentDidMount(){
    window.onbeforeunload = function(){
      return "message"
    }
  }

  onMakeLayout = value => {
    window.postMessage('fromwebview', this.state);
    console.log(this.state)
  };

  handleEmail = (value,type) =>{
    var svgHtmlString = Designsignifiers(value,type);

    this.setState({
      drawerVisible:true,
      svgHtmlString: svgHtmlString
    });

    return svgHtmlString;
    console.log(svgHtmlString);
  };

  onDrawerClose = (e) => {
    this.setState({
      drawerVisible:false
    });
  };

  downloadSVG = (e) => {
    console.log("running downloadSVG()");
    const svgContent = this.state.svgHtmlString,
    blob = new Blob([svgContent], {
      type: "image/svg+xml"
    });
    var url = window.URL.createObjectURL(blob);
    var link = e.target;

    link.target = "_blank";
    link.download = "DesignSignifiers.svg";
    link.href = url;
  };

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.icon}>
          <a href="https://www.jingwhale.cc/" target="_blank"><Icon type="home" /></a>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.tab}>
          <TabPane tab="组件标注" key="1">
            <div className={styles.tabContent}>
              <ComponentFormUI  id="ComponentFormUI" handleEmail={this.handleEmail.bind(this)}/>
            </div>
          </TabPane>
          <TabPane tab="页面标注" key="2">
            <div className={styles.tabContent}>
              <MainFormUI  id="MainFormUI" handleEmail={this.handleEmail.bind(this)}/>
            </div>
          </TabPane>
          <TabPane tab="about & help" key="3">
            <div className={styles.tabContent}>
              <AboutAndHelpUI  id="AboutAndHelpUI" />
            </div>
          </TabPane>
        </Tabs>
        <Drawer
          width={640}
          placement="right"
          closable={true}
          onClose={this.onDrawerClose}
          visible={this.state.drawerVisible}
        >
          <div dangerouslySetInnerHTML={{ __html: this.state.svgHtmlString}}></div>
          <div className={styles.button}>
            <a herf="#" type="primary" onClick={this.downloadSVG}>下载SVG</a>
          </div>
        </Drawer>
        <div className={styles.footer}>Designed and Coded by © Jingwhale</div>
      </div>
    );
  }
}

