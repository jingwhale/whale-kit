import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import styles from './list.css'
import { Droppable, Draggable } from 'react-beautiful-dnd';

  const grid = 8;

  const getListStyle = (isDraggingOver,droppableId,clientHeight) => ({
    background: isDraggingOver ? '#1890ff' : (droppableId==="treeBook" ? '#a5dff9' : '#40a9ff'),
    padding: grid,
    width: 250,
    borderRadius: 2
  });

  const getItemStyle = (isDragging, draggableStyle,droppableId,index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: droppableId==="treeBook" ? grid : grid * 2,
    margin: `10px 0 ${grid}px 0`,
    height:'74px',
  
    // change background colour if dragging
    background: isDragging ? '#91d5ff' : ((index===0&&droppableId!=="treeBook") ? "#e6f7ff":'#FFF'),
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

export default class ListUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {...props};
  };

  render() {
    var  { items, droppableId, listType, ignoreContainerClipping, isCombineEnabled, clientHeight} = this.state;
    return (
      <Droppable droppableId={droppableId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isCombineEnabled={isCombineEnabled}
      >
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            style={getListStyle(droppableSnapshot.isDraggingOver,droppableId,clientHeight)}
          >
          <div><Icon type="border-verticle" /><span className={styles.count}>（{items.list.length}）</span></div>
            {items.list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={getItemStyle(
                      draggableSnapshot.isDragging,
                      draggableProvided.draggableProps.style,
                      droppableId,
                      index
                    )}
                  >
                    {item.content}
                    {(!item.fillType) ? (
                      <span className={styles.arrow}>→</span> 
                    ):(
                      ""
                    )}
                    
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
        </Droppable>
    );
  }
}