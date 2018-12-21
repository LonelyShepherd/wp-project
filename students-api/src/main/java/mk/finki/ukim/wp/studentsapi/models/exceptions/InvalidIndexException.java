package mk.finki.ukim.wp.studentsapi.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The provided index has invalid format")
public class InvalidIndexException extends Exception {
}