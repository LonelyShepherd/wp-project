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

    public void add(String name) {
        StudyProgram st = new StudyProgram(name);
        repository.save(st);
    }

    public void delete(long id) {
        repository.deleteById(id);
    }
}
