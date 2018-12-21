package mk.finki.ukim.wp.studentsapi.service.interfaces;

import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotEmptyException;

import java.util.List;

public interface IStudyProgramService {
    List<StudyProgram> list();
    StudyProgram add(String name);
    void delete(long id) throws StudyProgramNotEmptyException;
}
