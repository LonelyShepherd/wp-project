package mk.finki.ukim.wp.studentsapi.web.rest;

import mk.finki.ukim.wp.studentsapi.models.EditExistingStudent;
import mk.finki.ukim.wp.studentsapi.models.NewStudent;
import mk.finki.ukim.wp.studentsapi.models.Student;
import mk.finki.ukim.wp.studentsapi.models.exceptions.InvalidIndexException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.ParameterMissingException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudentNotFoundException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotFoundException;
import mk.finki.ukim.wp.studentsapi.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/students", produces = MediaType.APPLICATION_JSON_VALUE)
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentService.list();
    }

    @GetMapping("/{index}")
    public Student getStudent(@PathVariable("index") String index) throws StudentNotFoundException {
        return studentService.single(index);
    }

    @GetMapping("/by_study_program/{id}")
    public List<Student> getStudentsByStudyProgram(@PathVariable("id") long id) {
        return studentService.listByStudyProgram(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addStudent(@RequestBody NewStudent newStudent, HttpServletResponse response) throws InvalidIndexException, ParameterMissingException, StudyProgramNotFoundException {
        Student st = studentService.add(newStudent.index, newStudent.name, newStudent.lastName, newStudent.studyProgramName);

        // opravi ga ovoj jutre: ne pravi actual redirect ako e toj cilj? i st na grub nacin se vrakja trazi ga u repository bolje
        response.setHeader("Location", "/" + st.getIndex());
    }

    @RequestMapping(path = "/{index}", method = RequestMethod.PATCH)
    public void editStudent(@PathVariable String index, @RequestBody EditExistingStudent editExistingStudent) throws StudentNotFoundException, StudyProgramNotFoundException {
        studentService.update(index, editExistingStudent.name, editExistingStudent.lastName, editExistingStudent.studyProgramName);
    }

    @RequestMapping(path = "/{index}", method = RequestMethod.DELETE)
    public void deleteStudent(@PathVariable String index) throws StudentNotFoundException {
        studentService.delete(index);
    }
}
