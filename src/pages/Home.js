import React, { Component } from 'react';
import StudentList from '../components/StudentsList';
import EditStudent from '../components/EditStudent';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  showDetails = () => {
    this.setState({show: true});
  }

  hideDetails = () => {
    this.setState({show: false});
  }

  onItemClick = e => {
    this.props.onItemClick(parseInt(e.target.id));
    this.showDetails();
  }

  onSubmit = student => {
    this.props.onSubmit(student);
    this.hideDetails();
  }

  onDelete = uid => {
    this.props.onDelete(parseInt(uid));
    this.hideDetails();
  }

  render = () => {
    const element = this.state.show && 
      <EditStudent 
        student={this.props.student} 
        onSubmit={this.onSubmit}
      />;

    return (
      <>
        <StudentList 
          students={this.props.students} 
          onItemClick={this.onItemClick}  
          onDelete={this.onDelete}
        />
        {element}
      </>
    );
  }
}

export default Home;