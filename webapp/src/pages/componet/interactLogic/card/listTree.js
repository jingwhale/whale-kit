import React, { PureComponent } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

  const grid = 8;

  const getListStyle = (isDraggingOver,droppableId) => ({
    background: isDraggingOver ? '#a5dff9' : '#a5dff9',
    padding: grid,
    width: 250,
  });

  const getItemStyle = (isDragging, draggableStyle,droppableId,index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? '#feee7d' : '#FFF',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });

export default class ListUI extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {...props};
  };

  render() {
    var  { items, droppableId, listType, ignoreContainerClipping, isCombineEnabled} = this.state;
    return (
      <Droppable droppableId={droppableId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isCombineEnabled={isCombineEnabled}
      >
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            style={getListStyle(droppableSnapshot.isDraggingOver,droppableId)}
          >
            {items.list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index} direction="horizontal">
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