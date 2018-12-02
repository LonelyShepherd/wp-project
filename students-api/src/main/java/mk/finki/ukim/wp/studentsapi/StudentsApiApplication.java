package mk.finki.ukim.wp.studentsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class StudentsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentsApiApplication.class, args);
	}
}
