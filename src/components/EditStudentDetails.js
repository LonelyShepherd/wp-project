import React, { Fragment } from 'react';
import UpdateInput from './UpdateInput';

function EditStudentDetails(props) {
  const submitHandler = e => {
    e.preventDefault();
    props.onUpdateStudent();
  }

  const student = props.current;

  return (
    <Fragment>
      {student.firstName} {student.lastName} - {student.index}, {student.module}
      <form onSubmit={submitHandler}>
        <UpdateInput value='' name='firstName' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='lastName' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='index' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='module' onValueChange={props.onValueChange} />
        <input type="submit" value="Submit" />
      </form>
    </Fragment>
  );
}

export default EditStudentDetails;