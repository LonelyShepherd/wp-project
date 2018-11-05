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
      show: false
    }

    this.student = {
      firstName: '',
      lastName: '',
      index: '',
      module: '',
    }

    this.uid = null;

    this.updateUid = this.updateUid.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
  }

  updateUid(e) {
    this.uid = parseInt(e.target.id);
    this.setState({show: true});
  }

  updateStudent(e) {
    this.student[e.target.name] = e.target.value;
  }

  updateStudents() {
    const student = this.student;
    const uid = this.uid;
    let list = [];

    // fix this shit
    // uids are messed up
    for (let i = 0; i < this.state.students.length; i++) {
      if(this.state.students[i].uid === uid) {
        list[i] = student;
      } else
        list[i] = this.state.students[i];
    }
    
    this.setState({
      students: list,
      show: false
    });
  }
  
  render() {
    let el = this.state.show && <EditStudentDetails onValueChange={this.updateStudent} onUpdateStudent={this.updateStudents} />
    
    return (
      <div>
        <StudentList students={this.state.students} onItemClick={this.updateUid} />
        {el}
      </div>
    );
  }
}

export default App;
