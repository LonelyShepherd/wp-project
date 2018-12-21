package mk.finki.ukim.wp.studentsapi.persistance;

import mk.finki.ukim.wp.studentsapi.models.Student;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface StudentRepository extends Repository<Student, String> {
    List<Student> findAll();
    Student findById(String index);
    Student save(Student student);
    void deleteById(String index);
}
