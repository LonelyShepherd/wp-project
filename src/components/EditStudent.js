import React from 'react';
import StudentForm from './StudentForm';

const EditStudent = ({ student, ...props }) => {
  return (
    <StudentForm {...props} edit text='Edit'>
      {`${student.index} ${student.name} ${student.lastName} - ${student.studyProgram.name}`}
    </StudentForm>
  );
}

export default EditStudent;