import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import styles from './index.css';
import MainFormUI from './component/mainForm/index.js';
import ComponentFormUI from './component/componentForm/index.js';
import Designsignifiers from './component/designsignifiers.js';

const TabPane = Tabs.TabPane;

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templateString:"",
    };
  };
  onMakeLayout = value => {
    window.postMessage('fromwebview', this.state);
    console.log(this.state)
  };

  handleEmail = (value,type) =>{
    var test = Designsignifiers(value,type);
    console.log(test);
  };

  render() {
    return (
      <div className={styles.body}>
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
          <TabPane tab="模块标注" key="4"></TabPane>
        </Tabs>
      </div>
    );
  }
}

