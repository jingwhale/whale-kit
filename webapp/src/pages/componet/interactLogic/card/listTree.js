import React, { PureComponent } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

  const grid = 8;

  const getListStyle = (isDraggingOver,droppableId,clientHeight) => ({
    background: isDraggingOver ? '#EBECF0' : '#E6EAEE',
    padding: grid,
    width: 250,
    "max-height": clientHeight-60,
    borderRadius: 2
  });

  const getItemStyle = (isDragging, draggableStyle,droppableId,index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? '#FFF' : '#FFF',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

export default class ListTreeUI extends PureComponent {
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