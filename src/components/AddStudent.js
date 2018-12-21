import React from 'react';
import StudentForm from './StudentForm';

const AddStudent = props => {
  return (
    <StudentForm text="Add" {...props}>
      <h1>Add new student</h1>
    </StudentForm>
  );
}

export default AddStudent;