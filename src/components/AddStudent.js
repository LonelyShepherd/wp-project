import React from 'react';
import StudentForm from './StudentForm';

const AddStudent = props => {
  return (
    <StudentForm {...props} text='Add'>
      <h1>Add new student</h1>
    </StudentForm>
  );
}

export default AddStudent;