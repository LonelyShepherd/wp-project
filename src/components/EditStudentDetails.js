import React from 'react';
import UpdateInput from './UpdateInput';

function EditStudentDetails(props) {
  const submitHandler = e => {
    e.preventDefault();
    props.onUpdateStudent();
  }

  return (
    <form onSubmit={submitHandler}>
      <UpdateInput value='' name='firstName' onValueChange={props.onValueChange} />
      <UpdateInput value='' name='lastName' onValueChange={props.onValueChange} />
      <UpdateInput value='' name='index' onValueChange={props.onValueChange} />
      <UpdateInput value='' name='module' onValueChange={props.onValueChange} />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default EditStudentDetails;