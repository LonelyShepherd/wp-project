import React, { Component } from 'react';
import { listStudents } from './repository/studentRepository';
import './App.css';
import StudentList from './components/StudentsList';
import EditStudentDetails from './components/EditStudentDetails';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: listStudents(),
      show: false,
      uid: null
    }

    this.toUpdate = {}

    this.updateUid = this.updateUid.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
  }

  updateUid(e) {
    this.setState({
      uid: parseInt(e.target.id),
      show: true
    });
  }

  updateStudent(e) {
    const name = e.target.name;

    this.toUpdate[name] = e.target.value;

    // in case one of the field values were updated but later updated again, only to be empty string
    // in that case the corresponding property will be empty string and when merged with appropriate 
    // student from the list, the property will be set to empty string, which is to be avoided
    // maybe there is more elegant solution to this! 
    this.toUpdate[name].trim() === '' && delete this.toUpdate[name];
  }

  updateStudents() {
    const students = this.state.students;
    const toUpdate = this.toUpdate;
    const uid = this.state.uid;

    this.setState({
      students: students.map(student => student.uid === uid ? {...student, ...toUpdate} : student),
      show: false
    });

    this.toUpdate = {};
  }
  
  render() {
    const show = this.state.show;
    const current = this.state.students.filter(student => student.uid === this.state.uid);

    const element = show 
      && <EditStudentDetails 
            onValueChange={this.updateStudent} 
            onUpdateStudent={this.updateStudents}
            current={current[0]}
          />
    
    return (
      <div>
        <StudentList
          students={this.state.students} 
          onItemClick={this.updateUid} 
        />
        {element}
      </div>
    );
  }
}

export default App;