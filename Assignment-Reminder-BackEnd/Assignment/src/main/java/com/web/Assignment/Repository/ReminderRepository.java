package com.web.Assignment.Repository;

import com.web.Assignment.Entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReminderRepository extends JpaRepository< Reminder, Long> {

    @Query("""
    SELECT r FROM Reminder r
    JOIN FETCH r.assignment
    WHERE r.sent = false
      AND r.reminderTime <= :now
""")
    List<Reminder> findPendingReminders(@Param("now") LocalDateTime now);

}