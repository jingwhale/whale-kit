import React, { PureComponent } from 'react';
import { Button, Input, Checkbox, Radio, Menu, Dropdown, Icon, message, Spin} from 'antd';
import axios from 'axios';
import validator from 'validator';
import styles from './index.css';

const RadioGroup = Radio.Group;
const APPKEY = "jingwhale";

export default class ScreenShotUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      artBoardName:"修订记录",
      artBoardNamePlaceholder: "修订记录",
      size: "small",
      button:"Insert Page",
      buttonDisabled: true,
      cancel:"Cancel",
      url: "",
      urlPlaceholder: "https://www.jingwhale.cc/",
      isPart:false,
      radioType: "",
      partId:"",
      partIdPlaceholder: "commits-listing",
      partIdDisabled: true,
      radioDisabled: true,
      partType: "tencentcommits",//1为自定义；其他为自定义字符串
      dropdownDisabled: true,
      checkboxDisabled: true,
      spinning: false,
      commitsName:"tencent commits",
      partTypeDefalt:{
        githubcommits:{
          name: "github commits",
          value:".commits-listing"
        },
        tencentcommits:{
          name: "tencent commits",
          value:".git-container-eIS"
        }
      }
    };
  };

  urlChange = (e) => {
    this.setState({
      url: e.target.value
    });

    this.validatorUrl(e);
  };

  artBoardNameChange = (e) => {
    this.setState({
      artBoardName: e.target.value
    });
  };

  artBoardNameOnBulr = (e) => {
    if(!e.target.value){
      message.error('ArtBoard Name is needed, it defaults to "修订记录"!',2);
    }
  };

  validatorUrl = (e) => {
    if(e.target.value){
      var validatorurl = validator.isURL(e.target.value);
      console.log(validatorurl);
      if(validatorurl){
        this.setState({
          buttonDisabled: !validatorurl,
          checkboxDisabled: !validatorurl
        });
      }else{
        message.error('Please enter a URL!',1);
        this.setState({
          checkboxDisabled: !validatorurl,
          isPart:false,
          radioDisabled: true,
          partIdDisabled: true,
          dropdownDisabled:true,
          radioType:""
        });
      }
    }
  };

  partIdChange = (e) => {
    this.setState({
      partId: e.target.value,
      buttonDisabled: !e.target.value
    });

  };

  partChange = (e) =>{
    console.log(e.target.checked);
    var radioType = e.target.checked ? 1: "";
    var radioDisabled = e.target.checked ? false: true;
    var dropdownDisabled = e.target.checked ? false: true;
    this.setState({
        isPart:e.target.checked,
        radioType:radioType,
        radioDisabled: radioDisabled,
        partIdDisabled: true,
        dropdownDisabled:dropdownDisabled
    })
  };

  onRadioChange =  (e) =>{
    if(this.state.isPart){
      if(e.target.value==1){
        this.setState({
          partIdDisabled:true,
          dropdownDisabled: false,
          buttonDisabled: false
        })

      }else{
        this.setState({
          partIdDisabled:false,
          dropdownDisabled: true,
          buttonDisabled: !this.state.partId,
          partType:1
        })
      }

      this.setState({
        radioType:e.target.value
      })
    }
  };

  handleMenuClick = (e)=>{
      var commitsName = this.state.partTypeDefalt[e.key].name;
      this.setState({
        commitsName:commitsName,
        partType:e.key
      });
      this.forceUpdate();
  };

  getImageData = () =>{
    var params = {
      appkey: APPKEY,
      artBoardName: this.state.artBoardName || "修订记录",
      url: this.state.url,
      isPart: this.state.isPart,
      partType: this.state.partType,//1，自定义类型；其他为字符串定义的类型：githubcommits
      partId: "."+this.state.partId
    };
    var that = this;
    axios.post('http://127.0.0.1:7001/service/screenshot',params)
      .then(function (response) {
        var backData = response.data.data;
        console.log(backData);
        if(backData.base64){
          backData.url = that.state.url;
          backData.artBoardName = that.state.artBoardName;
          console.log(backData);
          that.setState({
            buttonDisabled:false,
            spinning:false
          });
          window.postMessage('fromwebview', backData);
        }
      })
      .catch(function (error) {
        console.log(error);
        message.error('Please try again!',1);
        that.setState({
          buttonDisabled:false,
          spinning:false
        });
      })
  };

  insertPage = () => {
    this.setState({
      buttonDisabled:true,
      spinning:true
    });
    this.getImageData();
    console.log(this.state)
  };

  onCancel = () => {
    window.postMessage('closed');
  };

  render() {
    var  { size, button, cancel, url, urlPlaceholder, partId, partIdPlaceholder, partIdDisabled, radioDisabled, partTypeDefalt, dropdownDisabled, buttonDisabled, checkboxDisabled, isPart, spinning, artBoardName, artBoardNamePlaceholder, commitsName} = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="tencentcommits" size={size}><Icon type="qq" />{partTypeDefalt.tencentcommits.name}</Menu.Item>
        <Menu.Item key="githubcommits" size={size}><Icon type="github" />{partTypeDefalt.githubcommits.name}</Menu.Item>
      </Menu>
    );
    return (
      <Spin spinning={spinning} tip="In the screenshot, it takes some time...">
      <div className={styles.body}>
          <div className={styles.url}>
            <span className={styles.itemName}>ArtBoard Name:</span><Input size={size} className={styles.urlInputCss} value={artBoardName} onChange={this.artBoardNameChange} placeholder={artBoardNamePlaceholder} onBlur={this.artBoardNameOnBulr}/>
          </div>
          <div className={styles.url}>
              <span className={styles.itemName}>Page Url:</span><Input size={size} className={styles.urlInputCss} value={url} onChange={this.urlChange} placeholder={urlPlaceholder}/>
          </div>
          <div className={styles.line}></div>
          <div className={styles.part}>
            <span className={styles.itemName}><Checkbox size={size} className={styles.checkbox} defaultChecked={false} checked={isPart} onChange={this.partChange} disabled={checkboxDisabled}></Checkbox>Page Part:</span>
            <span className={styles.partTips}>get part of page</span>
            <div className={styles.partPannel}>
              <RadioGroup onChange={this.onRadioChange} value={this.state.radioType} disabled={radioDisabled}>
                <Radio className={styles.radioStyle} value={1} defaultChecked={true}>
                  <span className={styles.radioName}>Default:</span>
                 <Dropdown.Button overlay={menu} size={size} disabled={dropdownDisabled}>
                   {commitsName}
                </Dropdown.Button></Radio>
                <Radio className={styles.radioStyle} value={2}>
                  <span className={styles.radioName}>Custom:</span>
                  <Input addonBefore="." size={size} className={styles.urlInputCss} value={partId} onChange={this.partIdChange} placeholder={partIdPlaceholder} disabled={partIdDisabled}/></Radio>
                  <div className={partIdDisabled?styles.partIdTips:styles.partIdTipsLight}>the class name of the part</div>
              </RadioGroup>
            </div>
            <div className={styles.line1}></div>
            <div className={styles.buttons}>
              <Button size={size} onClick={this.onCancel} className={styles.button}>{cancel}</Button>
              <Button size={size} onClick={this.insertPage} type="primary" disabled={buttonDisabled}>{button}</Button>
            </div>
          </div>
      </div>
      </Spin>
    );
  }
}

