import React from 'react';
import Select from './Select';
import TextInput from './TextInput';
import StudyProgramController from '../controllers/StudyProgramController';

const studyProgramController = new StudyProgramController();

export default class StudenForm extends React.Component {
  constructor(props) {
    super(props);

    this.student = {};
  }

  registerChanges = e => {
    const name = e.target.name;
    const student = this.student;

    student[name] = e.target.value;
  
    if (student[name].trim() === '') 
      delete student[name];
  }

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.student);
  }

  render() {
    const {
      edit, 
      text,
      error,
    } = this.props;

    const indexField = !edit &&
      <div>
        <label>Index</label>
        <TextInput name="index" onChange={this.registerChanges} />
      </div>;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {this.props.children}
          <div className="fields">
            {indexField}
            <div>
              <label>First name</label>
              <TextInput name="name" onChange={this.registerChanges} />
            </div>
            <div>
              <label>Last name</label>
              <TextInput name="lastName" onChange={this.registerChanges} />
            </div>
            <div>
              <label>Study program</label>
              <Select 
                name="studyProgramName" 
                data={studyProgramController.all} 
                onChange={this.registerChanges} 
              />
            </div>
            <div>
              <input type="submit" value={text} />
            </div>
          </div>
          <div className="error">
            {error && <div>{error}</div>}
          </div>
        </form>
      </div>
    );
  }
}