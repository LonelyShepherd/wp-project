package mk.finki.ukim.wp.studentsapi.service;

import mk.finki.ukim.wp.studentsapi.models.Student;
import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.models.exceptions.InvalidIndexException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.ParameterMissingException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudentNotFoundException;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotFoundException;
import mk.finki.ukim.wp.studentsapi.persistance.StudentRepository;
import mk.finki.ukim.wp.studentsapi.persistance.StudyProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepository srepository;
    private final StudyProgramRepository sprepository;

    public StudentService(StudentRepository srepository, StudyProgramRepository sprepository) {
        this.srepository = srepository;
        this.sprepository = sprepository;
    }

    public List<Student> list() {
        return srepository.findAll().stream()
            .map(student -> new Student(student.getIndex(), student.getName(), student.getLastName()))
            .collect(Collectors.toList());
    }

    public Student single(String index) throws StudentNotFoundException {
        Optional<Student> s = srepository.findById(index);

        if (!s.isPresent())
            throw new StudentNotFoundException();

        return s.get();
    }

    public List<Student> listByStudyProgram(long id) {
        return srepository.findAll().stream()
            .filter(student -> student.getStudyProgram().getId() == id)
            .collect(Collectors.toList());
    }

    public Student add(String index, String name, String lastName, String studyProgramName) throws ParameterMissingException, InvalidIndexException, StudyProgramNotFoundException {
        if (index == null || name == null || lastName == null || studyProgramName == null)
            throw new ParameterMissingException();
        if (index.length() != 6)
            throw new InvalidIndexException();

        StudyProgram sp = sprepository.findByName(studyProgramName);

        if (sp == null)
            throw new StudyProgramNotFoundException();

        Student s = new Student(index, name, lastName, sp);

        srepository.save(s);

        return s;
    }

    public void update(String index, String name, String lastName, String studyProgramName) throws StudentNotFoundException, StudyProgramNotFoundException {
        Optional<Student> s = srepository.findById(index);

        if (!s.isPresent())
            throw new StudentNotFoundException();

        StudyProgram p = null;

        if (studyProgramName != null) {
            p = sprepository.findByName(studyProgramName);

            if (p == null)
                throw new StudyProgramNotFoundException();
        }

        Student st = s.get();

        st.setName(name != null ? name : st.getName());
        st.setLastName(lastName != null ? lastName : st.getLastName());
        st.setStudyProgram(p != null ? p : st.getStudyProgram());

        srepository.save(st);
    }

    public void delete(String index) throws StudentNotFoundException {
        if (!srepository.findById(index).isPresent())
            throw new StudentNotFoundException();

        srepository.deleteById(index);
    }
}