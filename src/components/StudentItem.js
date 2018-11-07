import React from 'react';

function StudentItem(props) {
  const clickHandler = e => {
    // prevents the further bubbling, both list item and the button element have their own events
    // when clicked on button the list item will register the click event as well which leads to
    // unwanted behaviour, this way it works as intented
    e.stopPropagation();
    props.onDelete('delete', e);
  }

  return (
    <li 
      id={props.id} 
      className='student-item' 
      onClick={props.updateUid}
    >
      {props.student.firstName} {props.student.lastName}
      <button id={props.id} onClick={clickHandler}>Delete</button>
    </li>
  );
}

export default StudentItem;