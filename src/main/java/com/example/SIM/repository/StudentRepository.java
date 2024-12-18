package com.example.SIM.repository;
import com.example.SIM.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Search by Name (contains)
    List<Student> findByNameContaining(String name);

    // Search by IndexNo
    List<Student> findByIndexNo(String indexNo);

    // Search by GPA (exact match or greater)
    List<Student> findByGpaGreaterThanEqual(Double gpa);

    // Combined Query using JPQL
    @Query("SELECT s FROM Student s WHERE " +
            "(:name IS NULL OR s.name LIKE %:name%) AND " +
            "(:indexNo IS NULL OR s.indexNo = :indexNo) AND " +
            "(:gpa IS NULL OR s.gpa >= :gpa)")
    List<Student> searchStudents(@Param("name") String name,
                                 @Param("indexNo") String indexNo,
                                 @Param("gpa") Double gpa);
}