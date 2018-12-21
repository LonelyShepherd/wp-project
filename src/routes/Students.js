import React from 'react';
import AddStudent from '../components/AddStudent';
import EditStudent from '../components/EditStudent';
import StudentsList from '../components/StudentsList';
import StudentController from '../controllers/StudentController';

const studentController = new StudentController();

export default class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      showDetails: false,
      index: null,
      addingError: null,
      editingError: null,
      deletingError: null
    }
  }

  addStudent = student => {    
    studentController.add(student)
      .then(data => {
        data.status >= 400 
          ? this.setState(state => ({ addingError: data.message }))
          : this.setState(state => ({
              students: [...state.students, data],
              addingError: null
            }));
      });
  }

  editStudent = student => {
    const { index, students } = this.state;
    
    studentController.edit(index, student)
      .then(data => {
        if (data.status >= 400) {
          this.setState(state => ({ editingError: data.message }))
        } else {
          this.setState(state => ({
            students: students.map(student => student.index === data.index ? {...student, ...data} : student),
            editingError: null
          }));

          student = {};
        }
      });
  }

  deleteStudent = e => {
    const index = e.target.id;

    studentController.delete(index)
      .then(response => {
        if (response.status >= 400) {
          response.json()
            .then(data => this.setState(state => ({ 
              showDetails: false,
              deletingError: data.message
            })));
        } else {
          this.setState(state => { 
            const students = state.students;
            students.splice(students.indexOf(students.filter(student => student.index === index)[0]), 1);
            
            return {
              students,
              showDetails: false,
              deletingError: null
            };
          });
        }
      });
  }

  showStudentDetails = e => {
    this.setState({
      index: e.target.id,
      showDetails: true
    });
  }

  onSubmit = student => {
    this.props.onSubmit(student);
    this.setState(state => ({ showDetails: false }))
  }

  componentDidMount() {
    studentController.all()
      .then(data => {
        this.setState(state => ({ students: data }));
      });
  }

  render() {
    const { 
      index, 
      students,
      showDetails,
      addingError,
      editingError,
      deletingError
    } = this.state;

    const student = students.filter(student => student.index === index)[0];
    
    const edit = showDetails && 
      <EditStudent 
        error={editingError}
        student={student} 
        onSubmit={this.editStudent}
      />;

    return (
      <div className="wrapper">
        <AddStudent 
          error={addingError}
          onSubmit={this.addStudent} 
        />
        <StudentsList 
          error={deletingError}
          students={students} 
          deleteStudent={this.deleteStudent}
          showStudentDetails={this.showStudentDetails}  
        />
        <div>
          {edit}
        </div>
      </div>
    );
  }
}