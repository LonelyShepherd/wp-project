import React from 'react';

const StudentItem = props => {
  const deleteItemHandler = e => {
    props.onDelete(e);
  }

  return (
    <li 
      id={props.id} 
      className='student-item' 
    >
      {`${props.student.name} ${props.student.lastName}`}
      <button id={props.id} onClick={props.onItemClick}>Details</button>
      <button id={props.id} onClick={deleteItemHandler}>Delete</button>
    </li>
  );
}

export default StudentItem;