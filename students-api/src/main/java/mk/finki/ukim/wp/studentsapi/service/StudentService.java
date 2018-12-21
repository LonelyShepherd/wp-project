package mk.finki.ukim.wp.studentsapi.service;

import mk.finki.ukim.wp.studentsapi.models.Student;
import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.models.exceptions.InvalidIndexException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.ParameterMissingException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudentNotFoundException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotFoundException;
import mk.finki.ukim.wp.studentsapi.persistance.StudentRepository;
import mk.finki.ukim.wp.studentsapi.persistance.StudyProgramRepository;
import mk.finki.ukim.wp.studentsapi.service.interfaces.IStudentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService implements IStudentService {
    private final StudentRepository studentRepository;
    private final StudyProgramRepository studyProgramRepository;

    public StudentService(StudentRepository studentRepository, StudyProgramRepository studyProgramRepository) {
        this.studentRepository = studentRepository;
        this.studyProgramRepository = studyProgramRepository;
    }

    public List<Student> list() {
        return studentRepository.findAll();
    }

    public Student single(String index) throws StudentNotFoundException {
        Student s = studentRepository.findById(index);

        if (s == null)
            throw new StudentNotFoundException();

        return s;
    }

    public List<Student> listByStudyProgram(long id) {
        return studentRepository.findAll().stream()
            .filter(student -> student.studyProgram.id == id)
            .collect(Collectors.toList());
    }

    public Student add(String index, String name, String lastName, String studyProgramName) throws ParameterMissingException, InvalidIndexException, StudyProgramNotFoundException {
        if (index == null || name == null || lastName == null || studyProgramName == null)
            throw new ParameterMissingException();
        if (index.length() != 6)
            throw new InvalidIndexException();

        StudyProgram sp = studyProgramRepository.findByName(studyProgramName);

        if (sp == null)
            throw new StudyProgramNotFoundException();

        Student s = new Student();
        s.index = index;
        s.name = name;
        s.lastName = lastName;
        s.studyProgram = sp;

        return studentRepository.save(s);
    }

    public Student update(String index, String name, String lastName, String studyProgramName) throws StudentNotFoundException, StudyProgramNotFoundException {
        Student s = studentRepository.findById(index);

        if (s == null)
            throw new StudentNotFoundException();

        StudyProgram p = null;

        if (studyProgramName != null) {
            p = studyProgramRepository.findByName(studyProgramName);

            if (p == null)
                throw new StudyProgramNotFoundException();
        }

        Student st = s;

        st.name = name != null ? name : st.name;
        st.lastName = lastName != null ? lastName : st.lastName;
        st.studyProgram = p != null ? p : st.studyProgram;

        return studentRepository.save(st);
    }

    public void delete(String index) throws StudentNotFoundException {
        if (studentRepository.findById(index) == null)
            throw new StudentNotFoundException();

        studentRepository.deleteById(index);
    }
}