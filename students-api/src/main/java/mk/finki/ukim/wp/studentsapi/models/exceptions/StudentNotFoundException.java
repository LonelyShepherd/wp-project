package mk.finki.ukim.wp.studentsapi.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "The student was not found")
public class StudentNotFoundException extends Exception {
}