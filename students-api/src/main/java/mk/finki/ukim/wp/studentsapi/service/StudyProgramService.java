package mk.finki.ukim.wp.studentsapi.service;

import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.persistance.StudyProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudyProgramService {
    private final StudyProgramRepository repository;

    public StudyProgramService(StudyProgramRepository repository) {
        this.repository = repository;
    }

    public List<StudyProgram> list() {
        return repository.findAll();
    }

    public StudyProgram add(String name) {
        StudyProgram st = new StudyProgram();
        st.name = name;

        return repository.save(st);
    }

    public StudyProgram delete(long id) {
        return repository.deleteById(id);
    }
}
