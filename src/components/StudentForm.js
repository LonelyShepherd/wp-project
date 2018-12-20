import React, {Component } from 'react';
import TextInput from './TextInput';
import Select from './Select';
import StudyProgramController from '../controllers/StudyProgramController';

const studyProgramController = new StudyProgramController();

class StudenForm extends Component {
  constructor(props) {
    super(props);

    this.student = {};
  }

  saveChanges = e => {
    const name = e.target.name;
    const student = this.student;

    student[name] = e.target.value;
  
    student[name].trim() === '' && delete student[name];
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.student);
  }

  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {this.props.children}
          {!this.props.edit && <TextInput value='' name="index" onChange={this.saveChanges} />}
          <TextInput value='' name='name' onChange={this.saveChanges} />
          <TextInput value='' name='lastName' onChange={this.saveChanges} />
          <Select data={studyProgramController.all} name="studyProgramName" onChange={this.saveChanges} />
          <input type="submit" value={this.props.text} />
        </form>
      </div>
    );
  }
}

export default StudenForm;