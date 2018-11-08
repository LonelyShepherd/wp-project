import React from 'react';
import StudentForm from './StudentForm';

const EditStudent = props => {
  const student = props.student;

  return (
    <StudentForm {...props} text='Edit'>
      {student.firstName} {student.lastName} - {student.index}, {student.module}
    </StudentForm>
  );
}

export default EditStudent;