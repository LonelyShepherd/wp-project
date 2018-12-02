package mk.finki.ukim.wp.studentsapi.persistance;

import mk.finki.ukim.wp.studentsapi.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}
