import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { listStudents } from './repository/studentRepository';
// note for future self: in practice it would be much better if the 
// separate page components (pages) are imported lazily i.e. only when needed    
import Add from './pages/Add';
import Home from './pages/Home';
import './App.css';

// silly way to have a global id but it's a lab project after all
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
    
    return (
      <Router>
        <>
          <div className="nav">
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/add'>Add Student</Link></li>
            </ul>
          </div>
          <Route exact path='/' render={() => 
            <Home 
              show={this.state.show}
              student={student}
              students={this.state.students} 
              onSubmit={this.editStudent}
              onDelete={this.deleteStudent} 
              onItemClick={this.updateUid} 
            />} 
          />
          <Route path='/add' render={() => <Add onSubmit={this.addStudent} />} />
        </>
      </Router>
    );
  }
}

export default App;