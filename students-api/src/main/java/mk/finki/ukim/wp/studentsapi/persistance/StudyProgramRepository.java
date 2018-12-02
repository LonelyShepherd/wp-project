package mk.finki.ukim.wp.studentsapi.persistance;

import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyProgramRepository extends JpaRepository<StudyProgram, Long> {
    StudyProgram findByName(String name);
}
