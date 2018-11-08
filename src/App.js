import React, { Component } from 'react';
import { listStudents } from './repository/studentRepository';
import './App.css';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import StudentList from './components/StudentsList';

// silly way to have a global id but it is a lab project after all
// in reality you would want to use various libraries that provides
// global unique id creation
let id = 5;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: listStudents(),
      show: false,
      uid: null
    }

    this.updateUid = this.updateUid.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  updateUid = e => {
    this.setState({
      uid: parseInt(e.target.id),
      show: true
    });
  }

  addStudent = o => {
    const students = this.state.students;
    const obj = {
      uid: ++id, 
      firstName: '', 
      lastName: '', 
      index:'',
      module: ''
    };

    this.setState({
      students: [...students, {...obj, ...o}],
      show: false
    });
  }

  editStudent = o => {
    const uid = this.state.uid;
    const students = this.state.students;
        
    this.setState({
      students: students.map(student => student.uid === uid ? {...student, ...o} : student),
      show: false
    });

    o = {};
  }

  deleteStudent = uid => {
    let students = this.state.students;
    students.splice(students.indexOf(students.filter(student => student.uid === parseInt(uid))[0]), 1);

    this.setState({
      students: students,
      show: false
    });
  }
  
  render = () => {
    const student = this.state.students.filter(student => student.uid === this.state.uid)[0];

    const element = this.state.show 
      && <EditStudent
            student={student} 
            onSubmit={this.editStudent}
          />
    
    return (
      <div>
        <AddStudent onSubmit={this.addStudent} />
        <StudentList
          students={this.state.students} 
          onDelete={this.deleteStudent} 
          onItemClick={this.updateUid}
        />
        {element}
      </div>
    );
  }
}

export default App;