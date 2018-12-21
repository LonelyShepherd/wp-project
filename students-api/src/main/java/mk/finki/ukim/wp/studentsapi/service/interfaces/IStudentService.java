package mk.finki.ukim.wp.studentsapi.service.interfaces;

import mk.finki.ukim.wp.studentsapi.models.Student;
import mk.finki.ukim.wp.studentsapi.models.exceptions.InvalidIndexException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.ParameterMissingException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudentNotFoundException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotFoundException;

import java.util.List;

public interface IStudentService {
    List<Student> list();
    Student single(String index) throws StudentNotFoundException;
    List<Student> listByStudyProgram(long id);
    Student add(String index, String name, String lastName, String studyProgramName) throws ParameterMissingException, InvalidIndexException, StudyProgramNotFoundException;
    Student update(String index, String name, String lastName, String studyProgramName) throws StudentNotFoundException, StudyProgramNotFoundException;
    void delete(String index) throws StudentNotFoundException;
}
