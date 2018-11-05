import React from 'react';

function StudentItem(props) {
  return (
    <li 
      id={props.id} 
      className='student-item' 
      onClick={props.updateUid}
    >
      {props.student.firstName} {props.student.lastName}
    </li>
  );
}

export default StudentItem;