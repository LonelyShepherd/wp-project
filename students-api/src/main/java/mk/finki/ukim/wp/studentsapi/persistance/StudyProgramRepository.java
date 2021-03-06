package mk.finki.ukim.wp.studentsapi.persistance;

import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface StudyProgramRepository extends Repository<StudyProgram, Long> {
    StudyProgram findByName(String name);
    List<StudyProgram> findAll();
    void deleteById(long id);
    StudyProgram save(StudyProgram studyProgram);
}
