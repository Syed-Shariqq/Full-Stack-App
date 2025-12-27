package com.web.Assignment.Controllers;

import com.web.Assignment.DTO.ReminderRequest;
import com.web.Assignment.Entity.AssignmentStatus;
import com.web.Assignment.Entity.User;
import com.web.Assignment.Repository.AssignmentStatusRepository;
import com.web.Assignment.Services.ReminderService;
import com.web.Assignment.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/reminders")
public class ReminderController {


    @Autowired
    private ReminderService reminderService;

    @Autowired
    private AssignmentStatusRepository assignmentStatusRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/{assignmentId}/reminder")
    public ResponseEntity<?> setReminder(
            @PathVariable Long assignmentId,
            @RequestBody ReminderRequest request,
            Principal principal) {

        User student = userService.getCurrentUser();

        AssignmentStatus status =
                assignmentStatusRepository
                        .findByAssignmentIdAndUserId(assignmentId, student.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Assignment not assigned to this student")
                        );

        reminderService.createReminder(
                status,
                request.getRemindBeforeHours()
        );

        return ResponseEntity.ok("Reminder set");
    }

}
