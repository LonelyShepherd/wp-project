import React from 'react';
import TextInput from '../components/TextInput';
import StudyProgramController from '../controllers/StudyProgramController';

const studyProgramController = new StudyProgramController();

class StudyPrograms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      programs: [],
      students: [],
      showStudents: false,
      deletingError: null
    };
  }

  submitHandler = (e) => {
    e.preventDefault();

    const { name } = this.state;

    if (!name.trim())
      return;

    studyProgramController.add(name)
      .then(data => {
        this.setState({
          programs: [...this.state.programs, data]
        });
      });
  }

  changeHandler = e => {
    this.setState({
      name: e.target.value
    });
  }

  deleteHandler = e => {
    const id = e.target.id;

    studyProgramController.delete(id)
      .then(response => {
        if (response.status >= 400) {
          response.json()
            .then(data => this.setState(state => ({ deletingError: data.message })));
        } else {
          this.setState(state => {
            const programs = state.programs;
            programs.splice(programs.indexOf(programs.filter(program => program.id === id)[0]), 1)

            return {
              programs: programs, 
              showStudents: false,
              deletingError: null
            }
          });
        }
      });
  }

  studentsHandler = e => {
    const id = e.target.id;

    studyProgramController.students(id)
      .then(data => {
        this.setState({
          students: data,
          showStudents: true
        });
      });
  }
 
  componentDidMount() {
    studyProgramController.all()
      .then(data => {
        this.setState({
          programs: data
        });
      });
  }

  render() {
    const {
      programs,
      students,
      showStudents,
      deletingError
    } = this.state;

    const programsList = programs.map(program => (
      <li 
        id={program.id}
        key={program.id}
      >
        {program.name}
        <button 
          id={program.id} 
          type="button" 
          onClick={this.studentsHandler}
        >See students</button>
        <button 
          id={program.id} 
          type="button" 
          onClick={this.deleteHandler}
        >Delete</button>
      </li>
    ));

    const studentsList = showStudents &&
      <div>
        <h1>Students ({students.length})</h1>
        <ul>
          {students.map(student => 
            <li key={student.index}>
              {`${student.index} ${student.name} ${student.lastName}`}
            </li>
          )}
        </ul>
      </div>;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <h1>Add new study program</h1>
          <div className="fields">
            <div>
              <label>Program name</label>
              <TextInput name="name" onChange={this.changeHandler} />
            </div>
            <div>
              <input type="submit" value="Add" />
            </div>
          </div>
        </form>
        <div>
          <h1>Study programs</h1>
          <ul>
            {programsList}
          </ul>
          {deletingError && <div className="error">{deletingError}</div>}
        </div>
        {studentsList}
      </div>
    );
  }
}

export default StudyPrograms;