package mk.finki.ukim.wp.studentsapi.persistance;

import mk.finki.ukim.wp.studentsapi.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends Repository<Student, String> {
    List<Student> findAll();
    Student findById(String index);
    Student save(Student student);
    Student deleteById(String index);
}
