class StudentController {
  add(student) {
    return fetch(`http://localhost:8080/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    })
      .then(response => response.json());
  }

  edit(index, student) {
    console.log(index, student);
    return fetch(`http://localhost:8080/students/${index}`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    })
      .then(response => response.json());
  }

  delete(index) {
    return fetch(`http://localhost:8080/students/${index}`, { method: 'DELETE' });
  }

  all() {
    return fetch('http://localhost:8080/students')
      .then(response => response.json());
  }
}

export default StudentController;