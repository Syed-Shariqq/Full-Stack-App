package com.web.Assignment.Repository;

import com.web.Assignment.Entity.Assignment;
import com.web.Assignment.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssignmentRepository extends JpaRepository<Assignment , Long> {

    List<Assignment> findByUser(User user);
    Optional<Assignment> findByIdAndUser (Long id, User user);
    long countByUser_Id(Long teacherId);
}
