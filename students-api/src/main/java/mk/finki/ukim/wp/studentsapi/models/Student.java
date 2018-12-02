package mk.finki.ukim.wp.studentsapi.models;

import javax.persistence.*;

@Entity
public class Student {
    @Id
    private String index;
    private String name;
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "studyProgramId")
    private StudyProgram studyProgram;

    public Student() { }

    public Student(String index, String name, String lastName) {
        this.index = index;
        this.name = name;
        this.lastName = lastName;
    }

    public Student(String index, String name, String lastName, StudyProgram studyProgram) {
        this.index = index;
        this.name = name;
        this.lastName = lastName;
        this.studyProgram = studyProgram;
    }

    public String getIndex() {
        return index;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public StudyProgram getStudyProgram() {
        return studyProgram;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setStudyProgram(StudyProgram studyProgram) {
        this.studyProgram = studyProgram;
    }
}