import React from 'react';

const StudentItem = props => {
  return (
    <li id={props.id} className="student-item">
      {`${props.student.name} ${props.student.lastName}`}
      <button id={props.id} onClick={props.showStudentDetails}>Details</button>
      <button id={props.id} onClick={props.deleteStudent}>Delete</button>
    </li>
  );
}

export default StudentItem;