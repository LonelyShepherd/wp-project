package mk.finki.ukim.wp.studentsapi.web.rest;

import mk.finki.ukim.wp.studentsapi.models.NewStudyProgram;
import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.models.exceptions.StudyProgramNotEmptyException;
import mk.finki.ukim.wp.studentsapi.service.interfaces.IStudyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin({"*", "localhost:3000"})
@RestController
@RequestMapping(value = "/study_programs", produces = MediaType.APPLICATION_JSON_VALUE)
public class StudyProgramController {
    private final IStudyProgramService studyProgramService;

    @Autowired
    StudyProgramController(IStudyProgramService studyProgramService) {
        this.studyProgramService = studyProgramService;
    }

    @GetMapping
    public List<StudyProgram> getStudyPrograms() {
        return studyProgramService.list();
    }

    @PostMapping
    public StudyProgram addStudyProgram(@RequestBody NewStudyProgram newStudyProgram) {
        return studyProgramService.add(newStudyProgram.name);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteStudyProgram(@PathVariable long id) throws StudyProgramNotEmptyException {
        studyProgramService.delete(id);
    }
}
