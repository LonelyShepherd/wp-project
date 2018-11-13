import React from 'react';
import StudentList from '../components/StudentsList';
import EditStudent from '../components/EditStudent';

const Home = props => {
  const element = props.show && 
    <EditStudent
      student={props.student} 
      onSubmit={props.editStudent}
    />;

  return (
    <>
      <StudentList
        students={props.students} 
        onDelete={props.onDelete} 
        onItemClick={props.onItemClick}
      />
      {element}
    </>
  );
}

export default Home;