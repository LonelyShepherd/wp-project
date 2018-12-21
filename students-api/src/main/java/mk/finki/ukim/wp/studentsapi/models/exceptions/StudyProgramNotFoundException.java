package mk.finki.ukim.wp.studentsapi.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The study program was not found")
public class StudyProgramNotFoundException extends Exception {
}
