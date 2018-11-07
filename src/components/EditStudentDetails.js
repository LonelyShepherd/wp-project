import React from 'react';
import UpdateInput from './UpdateInput';

const EditStudentDetails = props => {
  const submitHandler = e => {
    e.preventDefault();
    props.onUpdateStudent('edit');
  }

  const student = props.current;

  return (
    <>
      {student.firstName} {student.lastName} - {student.index}, {student.module}
      <form onSubmit={submitHandler}>
        <UpdateInput value='' name='firstName' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='lastName' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='index' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='module' onValueChange={props.onValueChange} />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default EditStudentDetails;