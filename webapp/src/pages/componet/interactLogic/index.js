import React, { PureComponent } from 'react';
import { Button, Input, Icon } from 'antd';
import styles from './index.css'
import ListUI from './card/list.js'
import ListTreeUI from './card/listTree.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const treeBook = {
  id:"treeBook",
  list:[
    {
      id:10001,
      content: "page1"
    },
    {
      id:10002,
      content: "page2"
    },
    {
      id:10003,
      content: "page3"
    },
    {
      id:10004,
      content: "page4"
    },
    {
      id:10005,
      content: "page5"
    },
    {
      id:10006,
      content: "page6"
    },
    {
      id:10007,
      content: "page7"
    }
  ]
};

const itemsData = {
  id:"alpha",
  list:[
    {
      id:1,
      content: "test1"
    },
    {
      id:2,
      content: "test2"
    },
    {
      id:3,
      content: "test3"
    },
    {
      id:4,
      content: "test4"
    },
    {
      id:5,
      content: "test5"
    },
    {
      id:6,
      content: "test6"
    },
    {
      id:7,
      content: "test7"
    }
  ]
};
const itemsData1 = {
  id: "beta",
  list: [
    {
      id:8,
      content: "test8"
    },
    {
      id:9,
      content: "test9"
    },
    {
      id:10,
      content: "test10"
    },
    {
      id:11,
      content: "test11"
    },
    {
      id:12,
      content: "test12"
    },
    {
      id:13,
      content: "test13"
    },
    {
      id:14,
      content: "test14"
    }
  ]
};

const itemsData2 = {
  id:"zeta",
  list:[
    {
      id:15,
      content: "test15"
    },
    {
      id:16,
      content: "test16"
    },
    {
      id:17,
      content: "test17"
    }
  ]
};
export default class IndexUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items:[itemsData,itemsData1,itemsData2],
      treeBook:treeBook
    };
  }

  onDragStart = (e) => {
    console.log(e);
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // const source = result.source;
    // const destination = result.destination;

    // this.setState(
    //   reorderQuoteMap({
    //     quoteMap: this.state.quoteMap,
    //     source,
    //     destination,
    //   }),
    // );
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
    var  { items, treeBook } = this.state;
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
                />
              </div>
            </div>
          </div>
          <div className={styles.list}>
          <h3>Flow（{items.length}）</h3>
          <Droppable 
          droppableId="column"
          type="PERSON"
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
          <div className={styles.input}><Input placeholder="输入流程名称"/></div>
          <div className={styles.doButton}><Button type="primary" onClick={this.doClick}>制作交互流程</Button> </div>
        </div>
      </div>
    );
  }
}