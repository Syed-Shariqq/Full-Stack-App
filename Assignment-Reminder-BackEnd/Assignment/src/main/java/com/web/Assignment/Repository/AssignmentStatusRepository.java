package com.web.Assignment.Repository;

import com.web.Assignment.Entity.AssignmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AssignmentStatusRepository
        extends JpaRepository<AssignmentStatus, Long> {

    Optional<AssignmentStatus> findByAssignmentIdAndUserId(Long assignmentId, Long userId);

    // DASHBOARD: assignments having at least one pending student
    @Query("""
        SELECT COUNT(DISTINCT s.assignment.id)
        FROM AssignmentStatus s
        WHERE s.completed = false
    """)
    long countAssignmentsWithPending();

    @Query("""
    SELECT COUNT(a.id)
    FROM Assignment a
    WHERE NOT EXISTS (
        SELECT s
        FROM AssignmentStatus s
        WHERE s.assignment = a
          AND s.completed = false
    )
""")
    Long countFullyCompletedAssignments();

    long countByAssignmentId(Long assignmentId);

    long countByAssignmentIdAndCompletedTrue(Long assignmentId);

    long countByAssignmentIdAndCompletedFalse(Long assignmentId);
}
