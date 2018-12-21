class StudyProgramController {
  all() {
    return fetch('http://localhost:8080/study_programs')
      .then(response => response.json());
  }

  add(name) {
    return fetch('http://localhost:8080/study_programs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json());
  }

  delete(id) {
    return fetch(`http://localhost:8080/study_programs/${id}`, { method: 'DELETE' });
  }

  students(id) {
    return fetch(`http://localhost:8080/students/by_study_program/${id}`)
      .then(response => response.json());
  }
}

export default StudyProgramController;