import React, { Component } from 'react';
import { listStudents } from './repository/studentRepository';
import './App.css';
import StudentList from './components/StudentsList';
import EditStudentDetails from './components/EditStudentDetails';
import AddStudent from './components/AddStudent';

// silly way to have a global id but it is a lab project after all
// in reality you would want to use various library that provides
// global unique id creation
let id = 5;

const registerChanges = (e, obj) => {
  const name = e.target.name;

  obj[name] = e.target.value;

  // in case one of the field values were updated but later updated again, only to be empty string
  // in that case the corresponding property will be empty string and when merged with appropriate 
  // student from the list, the property will be set to empty string, which is to be avoided
  // maybe there is more elegant solution to this! 
  obj[name].trim() === '' && delete obj[name];
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: listStudents(),
      show: false,
      uid: null
    }

    this.toAdd = {};
    this.toUpdate = {};

    this.updateUid = this.updateUid.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.updateStudents = this.updateStudents.bind(this);
  }

  updateUid = e => {
    this.setState({
      uid: parseInt(e.target.id),
      show: true
    });
  }

  updateStudent = e => {
    registerChanges(e, this.toUpdate)
  }

  addStudent = e => {
    registerChanges(e, this.toAdd)
  }

  updateStudents = (method, e) => {
    const students = this.state.students;
    const uid = this.state.uid;
    
    switch(method) {
      case 'edit':
        const toUpdate = this.toUpdate;
        
        this.setState({
          students: students.map(student => student.uid === uid ? {...student, ...toUpdate} : student),
          show: false
        });
        
        this.toUpdate = {};
      break;

      case 'delete':
        let temp = students;
        temp.splice(students.indexOf(students.filter(student => student.uid === parseInt(e.target.id))[0]), 1);

        this.setState({
          students: temp,
          show: false
        });
      break;

      case 'add':
        const toAdd = this.toAdd;
        const obj = {
          uid: ++id, 
          firstName: '', 
          lastName: '', 
          index:'',
          module: ''
        };

        this.setState({
          students: [...students, {...obj, ...toAdd}],
          show: false
        });
      break;

      // to avoid the warning
      default:
      break;
    }
  }
  
  render = () => {
    const show = this.state.show;
    const current = this.state.students.filter(student => student.uid === this.state.uid)[0];

    const element = show 
      && <EditStudentDetails 
            current={current}
            onValueChange={this.updateStudent} 
            onUpdateStudent={this.updateStudents}
          />
    
    return (
      <div>
        <AddStudent 
          onValueChange={this.addStudent}
          onAddStudent={this.updateStudents}
        />
        <StudentList
          onItemClick={this.updateUid}
          onDelete={this.updateStudents} 
          students={this.state.students} 
        />
        {element}
      </div>
    );
  }
}

export default App;