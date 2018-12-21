package mk.finki.ukim.wp.studentsapi.service;

import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotEmptyException;
import mk.finki.ukim.wp.studentsapi.persistance.StudyProgramRepository;
import mk.finki.ukim.wp.studentsapi.service.interfaces.IStudentService;
import mk.finki.ukim.wp.studentsapi.service.interfaces.IStudyProgramService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyProgramService implements IStudyProgramService {
    private final StudyProgramRepository repository;
    private final IStudentService studentService;

    public StudyProgramService(StudyProgramRepository repository, IStudentService studentService) {
        this.repository = repository;
        this.studentService = studentService;
    }

    public List<StudyProgram> list() {
        return repository.findAll();
    }

    public StudyProgram add(String name) {
        StudyProgram st = new StudyProgram();
        st.name = name;

        return repository.save(st);
    }

    public void delete(long id) throws StudyProgramNotEmptyException {
        if (!studentService.listByStudyProgram(id).isEmpty())
            throw new StudyProgramNotEmptyException();

        repository.deleteById(id);
    }
}
