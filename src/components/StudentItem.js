import React from 'react';

const StudentItem = props => {
  const deleteItemHandler = e => {
    // prevents the further bubbling, both list item and the button element have their own events
    // when clicked on button the list item will register the click event as well which leads to
    // unwanted behaviour, this way it works as intented
    e.stopPropagation();
    props.onDelete(e.target.id);
  }

  return (
    <li 
      id={props.id} 
      className='student-item' 
      onClick={props.onItemClick}
    >
      {props.student.firstName} {props.student.lastName}
      <button id={props.id} onClick={deleteItemHandler}>Delete</button>
    </li>
  );
}

export default StudentItem;