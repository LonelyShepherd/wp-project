package mk.finki.ukim.wp.studentsapi.web.rest;

import mk.finki.ukim.wp.studentsapi.models.*;
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
import java.util.stream.Collectors;

@CrossOrigin({"*", "localhost:3000"})
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
    public Student addStudent(@RequestBody NewStudent newStudent, HttpServletResponse response) throws InvalidIndexException, ParameterMissingException, StudyProgramNotFoundException {
        return studentService.add(newStudent.index, newStudent.name, newStudent.lastName, newStudent.studyProgramName);
    }

    @RequestMapping(path = "/{index}", method = RequestMethod.PATCH)
    public Student editStudent(@PathVariable String index, @RequestBody EditExistingStudent editExistingStudent) throws StudentNotFoundException, StudyProgramNotFoundException {
        return studentService.update(index, editExistingStudent.name, editExistingStudent.lastName, editExistingStudent.studyProgramName);
    }

    @RequestMapping(path = "/{index}", method = RequestMethod.DELETE)
    public Student deleteStudent(@PathVariable String index) throws StudentNotFoundException {
        return studentService.delete(index);
    }
}
