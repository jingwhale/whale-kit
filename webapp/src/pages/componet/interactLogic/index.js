import React, { PureComponent } from 'react';
import { Button, Input, Icon, InputNumber } from 'antd';
import styles from './index.css'
import ListUI from './card/list.js'
import ListTreeUI from './card/listTree.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const treeBook = {
  id:"treeBook",
  list:[
    {
      id:10001,
      abId: 123456,
      content: "page1"
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

    this.state = {
      items:[],
      treeBook:{
        id:"treeBook",
        list:[],
      },
      flowName:"",
      dist: {
        step:250,
        branch:100
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

  onDragStart = (e) => {
    console.log(e);
  };

  getItem = (droppableId) => {
    var getItem = {};
    var that = this;
    for(var i=0;i<that.state.items.length;i++){
      if(that.state.items[i].id === droppableId){
        getItem = that.state.items[i];
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

  doClick= (e) => {//点击制作流程按钮
    this.onMakeFlow();
    console.log(this.state);
  }

  onCancel = value => {//取消
    window.postMessage('closed');
  };

  onMakeFlow = value => {//向sketch传输数据
    var serializData1 = JSON.stringify(this.state);
    var serializData = JSON.parse(serializData1);
    window.postMessage('fromwebview', serializData);
  };

  onUpdateUI = value => {//向sketch传输数据
    this.forceUpdate();
  };

  onDragEnd = (result) => {
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
        items = this.getItem(result.source.droppableId).list;
        items.splice(result.source.index, 1, ...items.splice(result.destination.index, 1, items[result.source.index]))
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
    var  { items, treeBook, flowName, dist } = this.state;
    var that = this;

    window.someGlobalFunctionDefinedInTheWebview = function(data) {
      console.log("from sketch --- "+ data)
      treeBook.list = data;
      that.setState({
        treeBook: treeBook
      });
      that.forceUpdate();

      that.treeBookRef.current.forceUpdate();
    };

    return (
      <div>
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
                  ref={this.treeBookRef}
                />
              </div>
            </div>
          </div>
          <div className={styles.list}>
          <h3>Flow（{items.length}）</h3>
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
        </DragDropContext>
        <div className={styles.bottom}>
          <div className={styles.logo}><Icon type="pic-right" />&nbsp;&nbsp;Interact Logic</div>
          <div className={styles.inputDist}>
            <div className={styles.inputItem}><span>StepDist<span className={styles.inputPx}>（px）</span>：</span> <InputNumber size="default"  min={100} max={300} defaultValue={dist.step} onChange={this.stepDistChange} /></div>
            <div className={styles.inputItem}><span>BranchDist<span className={styles.inputPx}>（px）</span>：</span> <InputNumber size="default"  min={100} max={300} defaultValue={dist.branch} onChange={this.branchDistChange} /></div>
          </div>
          <div className={styles.input} ><Input placeholder="输入流程名称" value={flowName} onChange={this.flowNameChange}/></div>
          <div className={styles.doButton}><Button type="primary" onClick={this.doClick}>制作交互流程</Button> </div>
        </div>
      </div>
    );
  }
}