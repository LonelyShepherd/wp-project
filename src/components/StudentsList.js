import React, { Component } from 'react';
import StudentItem from './StudentItem';
import ReactPaginate from 'react-paginate';

class StudentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNum: 0,
      pageSize: 3
    }
  }

  pageClickHandler = data => {
    this.setState({pageNum: data.selected});
  }

  getPage = (offset, nextPageOffset) => {
    return this.props.students
      .map(student =>
        <StudentItem 
          id={student.uid} 
          key={student.uid}
          student={student} 
          onDelete={this.props.onDelete}
          updateUid={this.props.onItemClick}
        />
      )
      .filter((student, index) => index >= offset && index < nextPageOffset);
  }

  render = () => {
    const offset = this.state.pageNum * this.state.pageSize;
    const nextPageOffset = offset + this.state.pageSize;
    const pageCount = Math.ceil(this.props.students.length / this.state.pageSize)
    const pageItems = this.getPage(offset, nextPageOffset);

    return (
      <ul className='student-list'>
        {pageItems}
        <ReactPaginate 
          previousLabel='Previous'
          nextLabel='Next'
          breakLabel={<span>...</span>}
          breakClassName='page-break'
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={this.pageClickHandler}
          containerClassName='pagination'
          activeClassName='active'
        />
      </ul>
    );
  }
}

export default StudentsList;