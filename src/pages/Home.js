import React, { Component } from 'react';
import EditStudent from '../components/EditStudent';
import AddStudent from '../components/AddStudent';
import StudentController from '../controllers/StudentController';
import StudentsList from '../components/StudentsList';

const studentController = new StudentController();

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      index: null,
      students: []
    }
  }

  updateIndex = index => {
    this.setState({ index });
  }

  addStudent = o => {    
    studentController.add(o)
      .then(data => {
        console.log(data);
        this.setState({
          students: [...this.state.students, data]
        });
      });
  }

  editStudent = o => {
    const { index, students } = this.state;
    
    studentController.edit(index, o)
      .then(data => {
        this.setState({
          students: students.map(student => student.index === data.index ? {...student, ...data} : student)
        });
      });

    o = {};
  }

  deleteStudent = index => {
    studentController.delete(index)
    .then(response => {
        let { students } = this.state;
        students.splice(students.indexOf(students.filter(student => student.index === index)[0]), 1);

        this.setState(state => ({ students }));
      });
  }

  showDetails = () => {
    this.setState({ show: true });
  }

  hideDetails = () => {
    this.setState({ show: false });
  }

  onItemClick = e => {
    this.setState({
      show: true,
      index: e.target.id
    });
  }

  onDelete = e => {
    this.deleteStudent(parseInt(e.target.id));
    this.hideDetails();
  }

  onSubmit = student => {
    this.props.onSubmit(student);
    this.hideDetails();
  }

  componentDidMount() {
    studentController.all()
      .then(data => {
        this.setState({
          students: data
        });
      });
  }

  render = () => {
    const student = this.state.students.filter(student => student.index === this.state.index)[0];
    
    const edit = this.state.show && 
      <EditStudent 
        student={student} 
        onSubmit={this.editStudent}
      />;

    return (
      <>
        <AddStudent onSubmit={this.addStudent} />
        <StudentsList 
          students={this.state.students} 
          onDelete={this.onDelete}
          onItemClick={this.onItemClick}  
        />
        {edit}
      </>
    );
  }
}

export default Home;