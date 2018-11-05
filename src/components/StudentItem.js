import React from 'react';

function StudentItem(props) {
  return (
    <li id={props.id} className='student-item' onClick={props.updateUid}>
      {props.firstName} {props.lastName}
    </li>
  );
}

export default StudentItem;