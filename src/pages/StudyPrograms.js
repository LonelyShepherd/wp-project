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
      showStudents: false
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

  removeHandler = e => {
    const id = e.target.id;

    studyProgramController.delete(id)
      .then(response => {
        let { programs } = this.state;
        programs.splice(programs.indexOf(programs.filter(program => program.id === id)[0]), 1);

        this.setState(state => ({ programs }));
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
    const programs = this.state.programs.map(program => (
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
          onClick={this.removeHandler}
        >Delete</button>
      </li>
    ));

    const students = this.state.showStudents &&
      <ul>
        {this.state.students.map(student => 
          <li key={student.index}>
            {`${student.index} ${student.name} ${student.lastName}`}
          </li>
        )}
      </ul>

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <h1>Add new study program</h1>
          <label>Program name</label>
          <TextInput name="name" onChange={this.changeHandler} />
          <input type="submit" value="Add" />
        </form>
        <div>
          <ul>
            {programs}
          </ul>
        </div>
        {students}
      </div>
    );
  }
}

export default StudyPrograms;