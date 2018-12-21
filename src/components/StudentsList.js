import React from 'react';
import StudentItem from './StudentItem';

const StudentsList = props => {
  const { 
    error, 
    students,
    deleteStudent,
    showStudentDetails
  } = props;

  const listItems = students
    .map(student =>
      <StudentItem 
        id={student.index} 
        key={student.index}
        student={student}
        deleteStudent={deleteStudent}
        showStudentDetails={showStudentDetails}
      />
    );

  return (
    <div>
      <h1>Students</h1>
      <ul className='student-list'>
        {listItems}
      </ul>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default StudentsList;