import React, { PureComponent } from 'react';
import { Button, Checkbox, Input, Drawer, Icon, Message, Spin } from 'antd';
import styles from './index.css'

const { TextArea } = Input;

export default class PageLayoutUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prefixString:"",
      symbolString:"",
      visible: false,
      checkboxVisible:true,
      checkboxDisabled:false,
      inputDisabled:false,
      symbolIcons:[],
      allData:[],
      spinFlag:false,
      prefixArr:[]
    };

  };
  doClick= (e) => {//点击制作流程按钮
    if(this.state.symbolString){
      this.textAreaBtn();
    }else{
      Message.warning('请添加iconfont json.js');
    }
  }

  onCancel = value => {//取消
    window.postMessage('closed');
  };

  getPrefixArr = value => {//
    var prefixArr = [];
    var prefixString = this.state.prefixString;
    if(prefixString){
      prefixString = prefixString.replace(/\s*/g,"");
      prefixString=prefixString.replace(/；/ig,';');
      prefixArr = prefixString.split(";");
      if(prefixArr.length===0){
        prefixArr.push(prefixString);
      }
    };
    this.state.prefixArr = prefixArr;
  };

  onMake = () => {//向sketch传输数据
    debugger
    this.setState({
      spinFlag:true
    });
    this.state.prefixString = this.state.prefixString || "All Icons";
    var serializData1 = JSON.stringify(this.state);
    var serializData = JSON.parse(serializData1);
    window.postMessage('fromwebview', serializData);
  };

  textAreaChange = (e) =>{
    this.setState({
      symbolString: e.target.value
    })
  }

  inputChange = (e) =>{
    debugger
    this.setState({
      prefixString: e.target.value
    })
  }

  textAreaBtn = (e) =>{//处理symbolString数据
    if(!this.state.symbolString){
      Message.error('请粘贴iconfont.js！');
    }else{
      var myString = this.state.symbolString;
      var startIndex=myString.indexOf('<svg>');
      var endIndex=myString.indexOf('</svg>');
      console.log(startIndex);
      console.log(endIndex);
      var symbolString = myString.substring(startIndex+5,endIndex);
      //console.log(symbolString);

      var symbols = symbolString.split("<symbol");

      var symbolIcons = symbols.slice(1);
    
      this.state.symbolIcons = symbolIcons;

      this.onMake();
    }
  }

  formatData = (symbolIcons) => {
    var formatData = [];
    for(var i=0;i<symbolIcons.length;i++){
      var symbolstring = symbolIcons[i];
      var flagIndex = symbolstring.indexOf('<path');

      var need1 = symbolstring.substring(1,flagIndex);
      var need2 = symbolstring.substring(flagIndex);

      var need1json = need1.split(" ");
      var name = need1json[0].split("=")[1];

      console.log(name)
      var item = '<symbol> id="'+name+'" viewBox='+'"0 0 16 16">'+need2;
      formatData.push(item);
    }
    return formatData;
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onCheckboxChange = (e) => {
    this.setState({
      checkboxVisible: e.target.checked,
    });
  };


  render() {
    var  { symbolString, prefixString, checkboxVisible, spinFlag, checkboxDisabled, inputDisabled } = this.state;
    var that = this;
    window.someGlobalFunctionDefinedInTheWebview = function(data) {
      var flag = data.symbolString ? true : false;

      that.setState({
        prefixString: data.prefixString,
        symbolString: data.symbolString,
        checkboxDisabled: flag,
        inputDisabled: flag
      });

      that.forceUpdate();
    };

    return (
      <div className={styles.body}>
        <Spin className={styles.spin} tip="Icon Symbol制作中..." spinning={spinFlag}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>iconfont图标symbol化平台</span>
            <div className={styles.save} onClick={this.showDrawer}>
            <Icon type="save" />
          </div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <span className={styles.formTile}>图标库的名称:</span>
            <div className={styles.textArea}> <Input placeholder="图标库的名称；默认All Icons" onChange={this.inputChange} value={prefixString} disabled={inputDisabled}/></div>
          </div>

          <div className={styles.formItem}>
            <span className={styles.formTile}>iconfont json.js:</span>
            <div className={styles.textArea}> <TextArea placeholder="从iconfont平台下载项目至本地，复制json.js到这里" rows={10} onChange={this.textAreaChange} value={symbolString}/></div>
          </div>
          
          <div className={styles.button}>
            <span className={styles.checkbox}><Checkbox onChange={this.onCheckboxChange} checked={checkboxVisible} disabled={checkboxDisabled} >导出</Checkbox></span>
            <Button type="primary" onClick={this.textAreaBtn}>生成</Button>
            </div>
        </div>
        </Spin>
      </div>
    );
  }
}

