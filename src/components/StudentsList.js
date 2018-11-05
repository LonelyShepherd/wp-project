import React from 'react';
import StudentItem from './StudentItem';

function StudentsList(props) {
  const listItems = props.students.map(student =>
    <StudentItem 
      id={student.uid} 
      key={student.uid}
      student={student} 
      updateUid={props.onItemClick}
    />
  );

  return (
    <ul className='student-list'>{listItems}</ul>
  );
}

export default StudentsList;