import React from 'react';
import { Tabs, Modal, Radio, Button } from 'antd';
import styles from './index.css';
import { GetDataFormUI, getDataFormTemp } from './component/getDataForm/index.js';
import { ChangeDataFormUI, changeDataFormTemp } from './component/changeDataForm/index.js';
import { ShowDataFormUI, showDataFormTemp } from './component/showDataForm/index.js';
import { FunctionDataFormUI, functionDataFormTemp } from './component/functionDataForm/index.js';
import { CustomFormUI, customFormTemp } from './component/customForm/index.js';


const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;

const radioOptions = [
  { label: '获得数据', value: '获得数据' },
  { label: '改变数据项', value: '改变数据项' },
  { label: '展示数据', value: '展示数据' },
  { label: '功能', value: '功能'},
  { label: '自定义', value: '自定义'}
];

var currentFormTemp = JSON.parse(JSON.stringify(getDataFormTemp));

class ComponentFormUI extends React.Component {
  constructor(props) {
    super(props);

    this.myRef=React.createRef();

    this.newTabIndex = 1;
    const panes = [
      { title: '标注 0',  key: '0', type:"获得数据" }
    ];
    const  dataAll = [];
    dataAll.push(currentFormTemp);
    this.state = {
      svgHtmlString:"",
      drawerVisible:false,
      addTabModalVisible: false,
      activeKey: panes[0].key,
      panes,
      dataAll,
      radioValue:"获得数据",
      formType: "获得数据"//1、getDataForm；2、changeDataForm
    };
  }

  handleFormChange = (changedFields) => {
    var dataAll = this.state.dataAll;
    var activeKey = this.state.activeKey;

    dataAll[activeKey] = { ...dataAll[activeKey], ...changedFields };

    this.setState({dataAll});

    this.forceUpdate();
  };

  onTabChange = (activeKey) => {
    var formType = this.state.formType;
    const panes = this.state.panes;

    panes.forEach((pane,index) => {
      if (pane.key === activeKey) {
        formType = pane.type
      }
    });

    this.setState({ activeKey, formType});
  };

  onTabEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    this.showAddTabModal();
  };

  remove = (targetKey) => {
    this.showConfirm(targetKey);
  };

  removeTab = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }

    var formType = this.state.formType;
    var radioValue = this.state.radioValue;

    panes.forEach((pane,index) => {
      if (pane.key === activeKey) {
        formType = pane.type
      }
    });

    radioValue = formType;
    var dataAll = this.state.dataAll;
    dataAll[targetKey].flagDel = true;
    this.setState({ panes, activeKey, formType, radioValue, dataAll});
  };

  showAddTabModal = () => {
    this.setState({
      addTabModalVisible: true,
    });
  };

  handleAddTabOk = () => {
    const panes = this.state.panes;
    const dataAll = this.state.dataAll;
    var formType = this.state.formType;
    const activeKey = `${this.newTabIndex++}`;
    panes.push({ title: '标注 '+activeKey, key: activeKey, type:this.state.radioValue});
    dataAll.push(currentFormTemp);

    formType = this.state.radioValue;

    this.setState({ panes, activeKey, formType, dataAll, addTabModalVisible:false });
  }

  handleAddTabCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      addTabModalVisible: false,
    });
  };

  showConfirm = (targetKey) => {
    var that = this;
    confirm({
      title: '删除标注 '+targetKey,
      content: '确定要删除标注 '+targetKey+'吗？',
      onOk() {
        that.removeTab(targetKey);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  onRadioChange = (e) => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      radioValue:e.target.value
    });

    switch (e.target.value) {
      case '获得数据':
        currentFormTemp = JSON.parse(JSON.stringify(getDataFormTemp));
        break;
      case '改变数据项':
        currentFormTemp = JSON.parse(JSON.stringify(changeDataFormTemp));
        break;
      case '展示数据':
        currentFormTemp = JSON.parse(JSON.stringify(showDataFormTemp));
        break;
      case '功能':
        currentFormTemp = JSON.parse(JSON.stringify(functionDataFormTemp));
        break;
      case '自定义':
        currentFormTemp = JSON.parse(JSON.stringify(customFormTemp));
        break;
      default:
        currentFormTemp = JSON.parse(JSON.stringify(getDataFormTemp));
    }
  };

  makeSignifiers = (e) => {
    e.preventDefault();
    debugger
    var that = this;
    if(this.myRef.current){
      this.myRef.current.validateFieldsAndScroll((err, values) => {
        if (!err) {
          var svgHtmlString = that.props.handleEmail(this.state.dataAll,"component");
        }
      });
    }else {
      var svgHtmlString = that.props.handleEmail(this.state.dataAll,"component");
    }
  };

  render() {
    const dataAll = this.state.dataAll;
    const activeKey = this.state.activeKey;

    let dynamicForm;
    if(this.state.formType=="获得数据"){
      dynamicForm = (
        <div>
          <GetDataFormUI {...dataAll[activeKey]} ref={this.myRef} onChange={this.handleFormChange} />
        </div>
      );
    }else if(this.state.formType=="改变数据项"){
      dynamicForm = (
        <div>
          <ChangeDataFormUI {...dataAll[activeKey]} ref={this.myRef} onChange={this.handleFormChange} />
        </div>
      );
    }else if(this.state.formType=="展示数据"){
      dynamicForm = (
        <div>
          <ShowDataFormUI {...dataAll[activeKey]} ref={this.myRef} onChange={this.handleFormChange} />
        </div>
      );
    }else if(this.state.formType=="功能"){
      dynamicForm = (
        <div>
          <FunctionDataFormUI {...dataAll[activeKey]} ref={this.myRef} onChange={this.handleFormChange} />
        </div>
      );
    }else if(this.state.formType=="自定义"){
      dynamicForm = (
        <div>
          <CustomFormUI {...dataAll[activeKey]} ref={this.myRef} onChange={this.handleFormChange} />
        </div>
      );
    }

    return (
      <div>
        <Tabs
          onChange={this.onTabChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onTabEdit}
          tabPosition={"left"}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{dynamicForm}</TabPane>)}
        </Tabs>
        <div className={styles.button}>
          <Button type="primary" onClick={this.makeSignifiers}>生成组件标注</Button>
        </div>
        <Modal
          title="添加标注"
          visible={this.state.addTabModalVisible}
          onOk={this.handleAddTabOk}
          onCancel={this.handleAddTabCancel}
        >
          <RadioGroup options={radioOptions} onChange={this.onRadioChange} value={this.state.radioValue} />
        </Modal>
      </div>
    );
  }
}

export default ComponentFormUI;


