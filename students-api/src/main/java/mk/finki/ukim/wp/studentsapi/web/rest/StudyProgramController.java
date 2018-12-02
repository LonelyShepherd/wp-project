package mk.finki.ukim.wp.studentsapi.web.rest;

import mk.finki.ukim.wp.studentsapi.models.NewStudyProgram;
import mk.finki.ukim.wp.studentsapi.models.StudyProgram;
import mk.finki.ukim.wp.studentsapi.service.StudyProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/study_programs", produces = MediaType.APPLICATION_JSON_VALUE)
public class StudyProgramController {
    private final StudyProgramService studyProgramService;

    @Autowired
    StudyProgramController(StudyProgramService studyProgramService) {
        this.studyProgramService = studyProgramService;
    }

    @GetMapping
    public List<StudyProgram> getStudyPrograms() {
        return studyProgramService.list();
    }

    @PostMapping
    public void addStudyProgram(@RequestBody NewStudyProgram newStudyProgram) {
        studyProgramService.add(newStudyProgram.name);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteStudyProgram(@PathVariable long id) {
        studyProgramService.delete(id);
    }
}
