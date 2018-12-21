package mk.finki.ukim.wp.studentsapi.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Can't delete study program with active students")
public class StudyProgramNotEmptyException extends Exception {
}
