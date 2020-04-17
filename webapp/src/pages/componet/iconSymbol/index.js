import React, { PureComponent } from 'react';
import { Button, Checkbox, Input, Drawer, Icon, Message, Spin} from 'antd';
import styles from './index.css'

const { TextArea } = Input;

export default class PageLayoutUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      iconName:"示例项目",
      symbolString:"",
      visible: false,
      checkboxVisible:true,
      symbolIcons:[],
      allData:[],
      spinFlag:false
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

  onMake = () => {//向sketch传输数据
    debugger
    this.setState({
      spinFlag:true
    });
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
    this.setState({
      iconName: e.target.value
    })
  }

  textAreaBtn = (e) =>{//处理symbolString数据
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

  onCheckboxChange = () => {
    this.setState({
      checkboxVisible: false,
    });
  };


  render() {
    var  { symbolString, iconName, checkboxVisible, spinFlag } = this.state;
    var that = this;

    window.someGlobalFunctionDefinedInTheWebview = function(data) {
      that.setState({
        allData: data
      });
    };

    return (
      <div className={styles.body}>
        <Spin className={styles.spin} tip="Icon Symbol制作中..." spinning={spinFlag}></Spin>
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
            <span className={styles.formTile}>标题:</span>
            <div className={styles.textArea}> <Input onChange={this.inputChange} value={iconName} /></div>
          </div>

          <div className={styles.formItem}>
            <span className={styles.formTile}>iconfont json.js:</span>
            <div className={styles.textArea}> <TextArea placeholder="从iconfont平台下载项目至本地，复制json.js到这里" rows={10} onChange={this.textAreaChange} value={symbolString}/></div>
          </div>
          
          <div className={styles.button}>
            <span className={styles.checkbox}><Checkbox onChange={this.onCheckboxChange} checked={checkboxVisible}>导出</Checkbox></span>
            <Button type="primary" onClick={this.textAreaBtn}>生成</Button>
            </div>
        </div>
        <Drawer
          title="保存的Icon项目"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Icon项目1</p>
          <p>Icon项目2</p>
          <p>Icon项目3</p>
        </Drawer>
      </div>
    );
  }
}

