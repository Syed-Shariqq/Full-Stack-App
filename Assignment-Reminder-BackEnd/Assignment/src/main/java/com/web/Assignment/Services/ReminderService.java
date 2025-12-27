package com.web.Assignment.Services;

import com.web.Assignment.Entity.Assignment;
import com.web.Assignment.Entity.AssignmentStatus;
import com.web.Assignment.Entity.Reminder;
import com.web.Assignment.Entity.User;
import com.web.Assignment.Repository.ReminderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Transactional
    public void createReminder(AssignmentStatus status, int hoursBefore) {

        if (status.isCompleted()) {
            return;
        }

        Assignment assignment = status.getAssignment();
        User student = status.getUser();

        if (assignment.getDueDate() == null || assignment.getTime() == null) {
            throw new IllegalStateException("Due date or time missing");
        }

        LocalTime dueTime = LocalTime.parse(assignment.getTime());

        LocalDateTime dueDateTime =
                LocalDateTime.of(assignment.getDueDate(), dueTime);

        LocalDateTime reminderTime =
                dueDateTime.minusHours(hoursBefore);

        if (reminderTime.isBefore(LocalDateTime.now())) {
            return;
        }

        Reminder reminder = new Reminder();
        reminder.setAssignment(assignment);
        reminder.setUser(student);
        reminder.setReminderTime(reminderTime);
        reminder.setSent(false);

        reminderRepository.save(reminder);
    }

}


