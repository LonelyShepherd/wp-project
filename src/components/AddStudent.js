import React from 'react';
import UpdateInput from './UpdateInput';

const AddStudent = props => {
  const submitHandler = e => {
    e.preventDefault();
    props.onAddStudent('add');
  }

  return (
    <>
      <h1>Add new student</h1>
      <form onSubmit={submitHandler}>
        <UpdateInput value='' name='firstName' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='lastName' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='index' onValueChange={props.onValueChange} />
        <UpdateInput value='' name='module' onValueChange={props.onValueChange} />
        <input type="submit" value="Add" onClick={props.onAddStudent} />
      </form>
    </>
  );
}

export default AddStudent;