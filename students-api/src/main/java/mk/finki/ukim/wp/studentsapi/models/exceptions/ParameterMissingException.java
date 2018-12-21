package mk.finki.ukim.wp.studentsapi.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Some of the parameters is missing")
public class ParameterMissingException extends Exception {
}
