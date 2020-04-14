import React, { PureComponent } from 'react';
import { Button, Input, Icon, InputNumber, Modal, Checkbox, Message, Drawer, Tooltip, Spin, Menu, Dropdown } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './index.css'
import ListUI from './card/list.js'
import ListTreeUI from './card/listTree.js'


const { confirm } = Modal;
const { SubMenu } = Menu;

const treeBook = {
  id:"treeBook",
  list:[
    {
      id:10001,
      abId: 123456,
      content: "31省区市新增45例确诊病例31省区市新增45例确诊病例31省病例31省"
    },
    {
      id:10002,
      abId: 123456,
      content: "page2"
    },
    {
      id:10003,
      abId: 123456,
      content: "page3"
    },
    {
      id:10004,
      abId: 123456,
      content: "page4"
    },
    {
      id:10005,
      abId: 123456,
      content: "page5"
    },
    {
      id:10006,
      abId: 123456,
      content: "page6"
    },
    {
      id:10007,
      abId: 123456,
      content: "page7"
    }
  ]
};

export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.treeBookRef=React.createRef();
    this.listUIRef=React.createRef();
    var data = [
      {id:"1234",name:"test"}
    ]
    this.state = {
      items:[],
      treeBook:{
        id:"treeBook",
        list:[]
      },
      flowName:"",
      clientHeight:0,
      showUploadList:false,
      checkSave:true,
      settingFlowData:[],
      drawerVisible:false,
      type:"doFlow",
      spinFlag:false,
      hasArrow:true,
      visibleFlowItem:false,
      flowTreeData:[],
      currentEditFlow:{},
      dist: {
        step:150,
        branch:150
      }
    };
    

    // this.state = {
    //   items:[],
    //   treeBook:treeBook,
    //   flowName:"",
    //   dist: {
    //     step:160,
    //     branch:160
    //   }
    // };
  
  }

  getClientHeight = () => {
    if(document.body.clientHeight&&document.documentElement.clientHeight){
      this.state.clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }else{
      this.state.clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
  };

  componentWillMount(){
    this.getClientHeight();
  }

  onDragStart = (e) => {
    debugger
  };

  getItem = (droppableId) => {
    var getItem = {};
    var that = this;
    for(var i=0;i<that.state.items.length;i++){
      if(that.state.items[i].id === droppableId){
        getItem = that.state.items[i];
        getItem.index=i;
        return getItem;
      }
    }
  };

  deleteColumn = (droppableId) => {
    for(var i=0;i<this.state.items.length;i++){
      if(this.state.items[i].id === droppableId){
        this.state.items.splice(i, 1);
        this.forceUpdate();
        return;
      }
    }
  };

  stepDistChange = (value) => {//更新stepDist
    this.state.dist.step = value;
    console.log(this.state.dist.step)
  }

  branchDistChange = (value) => {//更新branchDist
    this.state.dist.branch = value;
    console.log(this.state.dist.branch)
  }

  flowNameChange = (e) => {//更新flowName
    this.setState({
      flowName:e.target.value
    })
  }

  changeFlow = (data) => {//上传flowArr
    if(data.items && data.items.length>0){
      this.setState({
        items:[],
        flowName:""
      })

      this.setState({
        items:data.items,
        flowName:data.name,
        drawerVisible: false
      })
      
      this.onUpdateUI();
    }else{
      this.setState({
        items:[],
        flowName:""
      })
    }
  }

  deleteFlow = (data) => {//上传flowArr
    var that = this;
    confirm({
      title: '确定要删除"'+data.name+'"流程吗？',
      content: '删除后不可恢复。',
      onOk() {
        var settingFlowData = that.state.settingFlowData;
        for(var i=0;i<settingFlowData.length;i++){
            if(settingFlowData[i].id === data.id){
              settingFlowData.splice(i, 1); 
              break;
            }
        }
        that.setState({
          settingFlowData:settingFlowData
        })
        that.showDrawer();
        that.onMakeFlow("updateFlowData");

        that.onUpdateUI();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  onSaveDataChange = (e) => {
    this.setState({
      checkSave: e.target.checked
    })
  }

  saveJSON = () => {//流程跟随，补齐子流程空白块
    var data = this.state.items;
    var filename = this.state.flowName;
    if(typeof data === 'object'){
      data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e);
  } 

  addOneTree = (addArr,item) => {//流程跟随，补齐子流程空白块
    var newData = "";
    for(var i=0;i<addArr.length;i++){
      if(addArr[i].name === item.name){
        newData = addArr[i];
      }else{
        newData = item;
      }
    }

    return newData;
  } 

  formatFlowData= (data) => {//点击制作流程按钮
    debugger

    this.setState({
      flowTreeData:[]
    });
    if(data.length<1) return;

    var settingFlowData = data;
    var flowTreeData = [];
    var addArr = [];

    for(var i=0;i<settingFlowData.length;i++){
      var item = settingFlowData[i].name.split('/');
      if(item.length===1){
        settingFlowData[i].pid = 0;
        addArr.push(settingFlowData[i]);
      }else if(item.length>1){
        var item1 = this.mergeFlowTreeData(addArr,item[0])
        if(!item1){
          var item1 = {
            id:'item'+ (new Date()).getTime()+i,
            name:item[0],
            pid:0
          }
          addArr.push(item1);
        }

        settingFlowData[i].pid = item1.id;
        addArr.push(settingFlowData[i]); 
      }
    }

    flowTreeData = this.formateList(addArr,'pid',0);
    

    return flowTreeData;
  }

  mergeFlowTreeData = (data,name) => {//hebing
    for(var i=0;i<data.length;i++){
      if(data[i].name === name){
        return data[i]
      }
    }
  }

  formateList= (list, parent_key, init_value = undefined, master_key = 'id') => {//点击制作流程按钮
    var that = this;
    let data = {formate: [], remainder: []}
    list.forEach(item => data[item[parent_key] === init_value ? 'formate' : 'remainder'].push(item))
    return data.formate.map(item => ({
        ...item,
        list: that.formateList(data.remainder, parent_key, item[master_key])
    }))
  }

  doClick= (e) => {//点击制作流程按钮
    if(this.state.items.length>0){
      this.onMakeFlow("doFlow");
    }else{
      Message.warning('请添加流程');
    }
    
    console.log(this.state);
  }

  onCancel = value => {//取消
    window.postMessage('closed');
  };

  onMakeFlow = (type) => {//向sketch传输数据
    debugger
    var spinFlag = (type==="doFlow") ? true : false;
    this.setState({
      type:type,
      spinFlag:spinFlag
    });
    this.state.type = type;
    var serializData1 = JSON.stringify(this.state);
    var serializData = JSON.parse(serializData1);
    window.postMessage('fromwebview', serializData);
  };

  onUpdateUI = value => {//向sketch传输数据
    this.forceUpdate();
  };

  doFillFlow = (fillFlowData) => {//横向建立流程
    var fillLength = (fillFlowData.type === "fillLeft") ? fillFlowData.currenItem.list.length:(fillFlowData.currenItem.list.length-1);

    for(var i=fillFlowData.fillItem.list.length;i<fillLength;i++){
      var objString = JSON.stringify(fillFlowData.currenItem.list[i]);
      var currenItemIndexInsert = JSON.parse(objString);
      currenItemIndexInsert.fillType = true;
      currenItemIndexInsert.content = "";
      currenItemIndexInsert.id = 'item'+ (new Date()).getTime()+i;
      fillFlowData.fillItem.list.push(currenItemIndexInsert);
      this.forceUpdate();
    }
    // var items = JSON.parse(JSON.stringify(this.state.items));

    this.setState({
      items:this.state.items
    })
    
  }

  fillBlankFlow= (result) => {//fillBlank
    var fillFlowData = {};
    var currenItem = this.getItem(result.source.droppableId); 
    var currenItemIndex = currenItem.index;
    var currenDragIndex = result.source.index;
    var flagData = this.getFillItem(currenItem,currenItemIndex); 
    if(currenDragIndex === (currenItem.list.length -1)){
      if(flagData.hasLengthThanCurrent){
        fillFlowData = {
          currenItem: flagData.maxItem,
          fillItem: currenItem,
          type:"fillLeft"
        }
      }else{
        if(currenItemIndex === (this.state.items.length-1)&& (currenItem.list.length>1)){
          var columnData = {
            id:'column'+(new Date()).getTime(),
            list: []
          }
          this.state.items.push(columnData)
        }
        fillFlowData = {
          currenItem: currenItem,
          fillItem: this.state.items[currenItemIndex+1],
          type:"fillRigt"
        }
      }
      this.showConfirm(fillFlowData);
    }
  };


  getFillItem= (currenItem,currenItemIndex) => {//fillBlank
    var maxItem = currenItem;
    var hasLengthThanCurrent = false;
    for(var i=(currenItemIndex+1);i<this.state.items.length;i++){
			if(this.state.items[i].list.length > maxItem.list.length){
        maxItem = this.state.items[i];
        hasLengthThanCurrent = true;
      }
    }
    var data = {
      maxItem:maxItem,
      hasLengthThanCurrent:hasLengthThanCurrent
    }
    return data;
  };

  showConfirm = (fillFlowData) => {//弹窗提醒横向建立流程
    var that = this;
    confirm({
      title: '要横向建立流程吗?',
      content: '横向建立流程后，会自动填空白内容，便于横向向建立流程。',
      onOk() {
        that.doFillFlow(fillFlowData);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
      flowTreeData:this.formatFlowData(this.state.settingFlowData)
    });
  };

  onClickFlowClick = (e) => {
    var targetDom = e.domEvent.target;
    var data = this.getFlowById(e.key);
    if(targetDom && targetDom.matches('a')){
      if(targetDom.innerText === "删除"){
        this.deleteFlow(data);
      }else{
        this.showFlowItemModal(data)
      }
    }else{
      this.changeFlow(data);
    }
  };

  getFlowById = (id) => {
    var settingFlowData = this.state.settingFlowData;
    for(var i=0;i<settingFlowData.length;i++){
        if(settingFlowData[i].id === id){
          return settingFlowData[i];
        }
    }
  };

  showFlowItemModal = (data) => {
    this.setState({
      visibleFlowItem: true,
      currentEditFlow:data
    });
  };

  handleFlowItemModalOk = e => {
    console.log(e);
    this.setState({
      visibleFlowItem: false,
    });
    this.showDrawer();
    this.onMakeFlow("updateFlowData");
    this.onUpdateUI();
  };

  onEditFlowNameChange = e => {
    debugger
    var currentEditFlow = this.state.currentEditFlow;
    currentEditFlow.name = e.target.value;
    this.setState({
      currentEditFlow:currentEditFlow
    })

    this.forceUpdate();
  };

  handleFlowItemModalCancel = e => {
    console.log(e);
    this.setState({
      visibleFlowItem: false,
      currentEditFlow:{}
    });
  };


  changeHasArrow = (e) => {
    this.setState({
      hasArrow: e.target.checked
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false
    });
  };

  onDragEnd = (result) => {
    debugger
    if (!result.destination) {
      if(result.source.droppableId==="treeBook"){
        var listData = [];
        var treeBook = JSON.parse(JSON.stringify(this.state.treeBook));
        var itemData = treeBook.list[result.source.index];
        itemData.id = 'item'+ (new Date()).getTime();
        listData.push(itemData);
        var columnData = {
          id:'column'+(new Date()).getTime(),
          list: listData
        }
        this.state.items.push(columnData)
        // this.setState({})
        this.forceUpdate();
      }else{
        //拖到column外删除card
        var sourceItems = this.getItem(result.source.droppableId).list;
        sourceItems.splice(result.source.index, 1);
        if(sourceItems.length<1){
          this.deleteColumn(result.source.droppableId)
        }
      }
      
      return;
    }

    if(result.type==="column"){//拖拽column
      const items = this.state.items;

      items.splice(result.source.index, 1, ...items.splice(result.destination.index, 1, items[result.source.index]))

      this.setState({ items: items });

      return;
    }
    
    if(result.type==="card"){//拖拽card
      var items = [];
      if(result.destination.droppableId===result.source.droppableId){//同column
        if (result.source.droppableId==="treeBook"){
          return;
        }
        if(result.destination.index===result.source.index){
          this.fillBlankFlow(result);
        }else{
          items = this.getItem(result.source.droppableId).list;
          items.splice(result.source.index, 1, ...items.splice(result.destination.index, 1, items[result.source.index]))
        }
        
      }else{//不同column
        if (result.destination.droppableId==="treeBook"){
          return;
        }
        if(result.source.droppableId === "treeBook"){
          var sourceItems = JSON.parse(JSON.stringify(this.state.treeBook)).list;
        }else{
          var sourceItems = this.getItem(result.source.droppableId).list;
        }
        
        var destinationItems = this.getItem(result.destination.droppableId).list;
        var insertData = sourceItems[result.source.index];
        insertData.id = 'item'+ (new Date()).getTime();
        destinationItems.splice(result.destination.index, 0, insertData);

        if(result.source.droppableId !== "treeBook"){
          sourceItems.splice(result.source.index, 1);
        }

        if(sourceItems.length<1){
          this.deleteColumn(result.source.droppableId)
        }
      }
    }
  };

  // TODO
  getDisabledDroppable = (sourceDroppable) => {
    if (!sourceDroppable) {
      return null;
    }

    const droppables = ['alpha', 'beta', 'gamma', 'delta'];
    const sourceIndex = droppables.indexOf(sourceDroppable);
    const disabledDroppableIndex = (sourceIndex + 1) % droppables.length;

    return droppables[disabledDroppableIndex];
  };

  render() {
    var  { items, treeBook, flowName, dist, clientHeight, currentEditFlow, settingFlowData, spinFlag, hasArrow, flowTreeData} = this.state;
    var that = this;

    const flowMenu = (
      <Menu>
        <Menu.Item key="edit">
          <a className={styles.flowEdit}>
            编辑名称
          </a>
        </Menu.Item>
        <Menu.Item>
          <a className={styles.flowDelete}>
            删除
          </a>
        </Menu.Item>
      </Menu>
    );

    window.someGlobalFunctionDefinedInTheWebview = function(data) {
      console.log("from sketch --- "+ data);
      console.log("from sketch data[1] --- "+ data[1]);
      // var getData = JSON.parse(data);
      
      treeBook.list = data[0];
      that.setState({
        treeBook: treeBook,
        settingFlowData: data[1]
      });

      that.forceUpdate();

      that.treeBookRef.current.forceUpdate();
    };

    return (
      <div>
        <Spin className={styles.spin} tip="流程制作中..." spinning={spinFlag}></Spin>
        <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
          <div className={styles.treeBook}>
            <h3 className={styles.marginLeft}>Page（{treeBook.list.length}）</h3>
            <div className={styles.treeBookWrap}>
              <div className={styles.column}>
                <ListTreeUI
                  droppableId="treeBook"
                  title="treeBook"
                  listId="treeBook"
                  listType="card"
                  items={treeBook}
                  clientHeight={clientHeight}
                  ref={this.treeBookRef}
                />
              </div>
            </div>
          </div>
          <div className={styles.list}>
          <div className={styles.topFixed}></div> 
          <div className={styles.top}>
            <div className={styles.logo}><Icon type="pic-right" />&nbsp;&nbsp;Interact Logic</div>
            <div className={styles.input} ><Input placeholder="输入流程名称" value={flowName} onChange={this.flowNameChange}/></div>
            <div className={styles.inputDist}>
              <div className={styles.inputItem}><span>StepDist<span className={styles.inputPx}>（px）</span>：</span> <InputNumber size="default"  min={100} max={300} defaultValue={dist.step} onChange={this.stepDistChange} /></div>
            </div>
            <div className={styles.menu} >
              <div className={styles.actionItem} onClick={e=>this.changeFlow("")}>
                <Tooltip placement="left" title="清空当前流程">
                  <Icon type="redo"/>
                </Tooltip>
              </div>
              <Modal
                title="编辑流程名称"
                visible={this.state.visibleFlowItem}
                onOk={this.handleFlowItemModalOk}
                onCancel={this.handleFlowItemModalCancel}
                okText={"确定"}
                cancelText={"取消"}
              >
                <Input value={currentEditFlow.name || ""} onChange={this.onEditFlowNameChange}></Input>
              </Modal>
              {(settingFlowData.length>0) ? (    
              <div className={styles.drawerDialog}>
                <div onClick={this.showDrawer}>
                  <Icon type="save" />
                </div>
                <Drawer
                  title="保存的流程"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.drawerVisible}
                >
                  <Menu mode="vertical"  onClick={this.onClickFlowClick}>
                  {flowTreeData.map((item, index) => (
                    (item.list.length>0) ? (
                      <SubMenu title={item.name}>
                      {item.list.map((seconditem, secondndex) => (
                        <Menu.Item key={seconditem.id}>
                            <Dropdown className={styles.FlowItem} overlay={flowMenu}>
                              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Icon type="more" />
                              </a>
                            </Dropdown>
                            {seconditem.name}
                        </Menu.Item>
                      ))}
                      </SubMenu>
                    ):(
                      <Menu.Item key={item.id}>
                      <Dropdown className={styles.FlowItem} overlay={flowMenu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          <Icon type="more" />
                        </a>
                      </Dropdown>
                      <span>{item.name}</span>
                    </Menu.Item>
                    )
                    ))}
                  </Menu>
                </Drawer>
              </div>
              ):(
                ""
              )}
            </div>
          </div>
          
          <div style={{'max-height':clientHeight,overflow: "auto"}}>
          <Droppable 
          droppableId="column"
          type="column"
          direction="horizontal"
          >
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                className={styles.root}
              >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
            {(draggableProvided, draggableSnapshot) => (
              <div
                className={styles.verticalScrollContainer}
                ref={draggableProvided.innerRef}
                {...draggableProvided.draggableProps}
                {...draggableProvided.dragHandleProps}
              >
            <div>
              <div className={styles.column}>
                <ListUI
                  droppableId={item.id}
                  title={item.id}
                  listId={item.id}
                  listType="card"
                  index={index}
                  items={item}
                  clientHeight={clientHeight}
                />
              </div>
            </div>
            </div>
                )}
              </Draggable>
          ))}
          {droppableProvided.placeholder}
          </div>
        )}
        </Droppable>
          </div>
        </div>
        </DragDropContext>
        <div className={styles.action}>
          <div className={styles.doButton}>
            <Checkbox onChange={this.changeHasArrow} checked={hasArrow}>箭头</Checkbox>
            <Button type="primary" className={styles.buttonMargin} onClick={this.doClick}>确定</Button>
          </div>
        </div>
      </div>
    );
  }
}