import React from 'react';
import StudentItem from './StudentItem';

function StudentsList(props) {
  const listItems = props.students.map(student =>
    <StudentItem 
      id={student.uid} 
      key={student.uid} 
      firstName={student.firstName} 
      lastName={student.lastName} 
      updateUid={props.onItemClick} 
    />
  );

  return (
    <ul>{listItems}</ul>
  );
}

export default StudentsList;