import React, { PureComponent } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Tabs, Radio, InputNumber} from 'antd';
import styles from './index.css';
import MainFormUI from './component/mainForm/index.js';


const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,//1,Equal layout;2,Proportional layout
      size: "small",
      button:"Make Layout",
      cancel:"Cancel",
      rows: 1,
      rowMargin:2,
      columns:3,
      columnMargin: 3,
      showCoordinate: true,
      rowMarginDisabled: true,
      columnMarginDisabled: false,
      proporData: {
        type:2,//1,"row";2,column
        row1:1,
        row2:2,
        column1:1,
        column2:3,
        rowDisabled: true,
        columnDisabled:false
      }
    };

  };
  onMakeLayout = value => {
    window.postMessage('fromwebview', this.state);
    console.log(this.state)
  };

  onCancel = value => {
    window.postMessage('closed');
  };

  showCoordinateChange = value =>{
    this.setState({
      showCoordinate:value.target.checked
    })
  };

  rowsChange = (value) =>{
    this.setState({
      rows:value
    });
    if(value==1){
      this.setState({
        rowMarginDisabled:true
      })
    }else{
      this.setState({
        rowMarginDisabled:false
      })
    }
  }

  rowMarginChange = (value) =>{
    this.setState({
      rowMargin:value
    })
  }

  columnsChange = (value) =>{
    this.setState({
      columns:value
    });
    if(value==1){
      this.setState({
        columnMarginDisabled:true
      })
    }else{
      this.setState({
        columnMarginDisabled:false
      })
    }
  }

  columnMarginChange = (value) =>{
    this.setState({
      columnMargin:value
    });
  };

  callback = (key) => {
    console.log(key);
    var data = this.state;

    if(key==2){
      data.rowMargin=0;
      data.columnMargin=0;
      data.type=2;
      if(data.proporData.type==1){
        data.rows = 2;
        data.columns = 1;
      }else{
        data.rows = 1;
        data.columns = 2;
      }
    }else{
      data.type=1;
    }
    this.setState(data);
    this.forceUpdate();
    this.rowsChange(data.rows);
    this.columnsChange(data.columns);
    console.log(this.state);
  };

  radioChange = (e) => {
    console.log(this.state.proporData);
    var proporData = this.state.proporData;
    proporData.type=e.target.value;
    if(e.target.value==1){
      proporData.columnDisabled=true;
      proporData.rowDisabled=false;
    }else{
      proporData.rowDisabled=true;
      proporData.columnDisabled=false;
    }
    this.setState({
      proporData: proporData
    });
    this.forceUpdate();

    this.callback("2");

    console.log(this.state.proporData)
  };

  row1Change = (value) =>{
    var proporData = this.state.proporData;
    proporData.row1=value;
    this.setState({
      proporData: proporData
    });
    console.log(proporData)
  }

  row2Change = (value) =>{
    var proporData = this.state.proporData;
    proporData.row2=value;
    this.setState({
      proporData: proporData
    })
    console.log(proporData)
  }

  column1Change = (value) =>{
    var proporData = this.state.proporData;
    proporData.column1=value;
    this.setState({
      proporData: proporData
    })
    console.log(proporData)
  }

  column2Change = (value) =>{
    var proporData = this.state.proporData;
    proporData.column2=value;
    this.setState({
      proporData: proporData
    })
    console.log(proporData)
  }

  handleEmail = (value) =>{
  };
  
  render() {
    var  { size, button, cancel, rows, rowMargin, columns, columnMargin, proporData} = this.state;

    return (
      <div className={styles.body}>
        <Tabs defaultActiveKey="1" onChange={this.callback} className={styles.tab}>
          <TabPane tab="页面标注" key="1">
            <div className={styles.tabContent}>
              <MainFormUI  handleEmail={this.handleEmail.bind(this)}/>
            </div>
          </TabPane>
          <TabPane tab="组件标注" key="2">
            <div className={styles.tabContent1}>
              <RadioGroup onChange={this.radioChange} value={this.state.proporData.type}>
                <Radio value={2} className={styles.radioStyle}>
                  <span className={styles.radioName}><span className={styles.symbolTip}>↕</span> column:</span>
                  <InputNumber size={size}  min={1} max={100} defaultValue={proporData.column1} disabled={proporData.columnDisabled} onChange={this.column1Change}/>
                  <span className={styles.line}>:</span>
                  <InputNumber size={size}  min={1} max={100} defaultValue={proporData.column2} disabled={proporData.columnDisabled} onChange={this.column2Change}/>
                  <div className={styles.inputTip}>
                    <span className={styles.inputTipType}>1*2</span>
                    <sapn className={styles.inputTipPostion1}>left</sapn>
                    <span className={styles.inputTipPostion2}>right</span>
                  </div>
                </Radio>
                <Radio value={1} className={styles.radioStyle}>
                  <span className={styles.radioName}><span className={styles.symbolTip}>⟷</span> row:</span>
                  <InputNumber size={size}  min={1} max={100} defaultValue={proporData.row1} disabled={proporData.rowDisabled} onChange={this.row1Change}/>
                  <span className={styles.line}>:</span>
                  <InputNumber size={size}  min={1} max={100} defaultValue={proporData.row2} disabled={proporData.rowDisabled} onChange={this.row2Change}/>
                  <div className={styles.inputTip1} >
                    <span className={styles.inputTipType}>2*1</span>
                    <sapn className={styles.inputTipPostion1}>up</sapn>
                    <span className={styles.inputTipPostion2}>down</span>
                  </div>
                </Radio>
              </RadioGroup>
            </div>
          </TabPane>
          <TabPane tab="元素标注" key="3"></TabPane>
          <TabPane tab="模块标注" key="4"></TabPane>
        </Tabs>
      </div>
    );
  }
}

