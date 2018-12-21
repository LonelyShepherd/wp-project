import React from 'react';
import StudentForm from './StudentForm';

const EditStudent = ({ student, ...props }) => {
  console.log(student);
  return (
    <StudentForm edit text="Edit" {...props}>
      <h1>{`${student.name} ${student.lastName}`}</h1>
      <div>
        <h4>Index: {student.index}</h4>
        <h4>Study program: {student.studyProgram.name}</h4>
      </div>
      <h3>Edit</h3>
    </StudentForm>
  );
}

export default EditStudent;