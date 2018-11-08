import React, {Component } from 'react';
import TextInput from './TextInput';

class StudenForm extends Component {
  constructor(props) {
    super(props);

    this.student = {};

    this.saveChanges = this.saveChanges.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  saveChanges = e => {
    const name = e.target.name;
    const student = this.student;

    student[name] = e.target.value;
  
    // in case one of the field values were updated but later updated again, only to be empty string
    // in that case the corresponding property will be empty string and when merged with appropriate 
    // student from the list, the property will be set to empty string, which is to be avoided
    // maybe there is more elegant solution to this! 
    student[name].trim() === '' && delete student[name];
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.student);
  }

  render = () => {
    return (
      <>
        {this.props.children}
        <form onSubmit={this.submitHandler}>
          <TextInput value='' name='firstName' onChange={this.saveChanges} />
          <TextInput value='' name='lastName' onChange={this.saveChanges} />
          <TextInput value='' name='index' onChange={this.saveChanges} />
          <TextInput value='' name='module' onChange={this.saveChanges} />
          <input type="submit" value={this.props.text} />
        </form>
      </>
    );
  }
}

export default StudenForm;