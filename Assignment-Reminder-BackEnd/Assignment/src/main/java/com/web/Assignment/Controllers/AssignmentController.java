package com.web.Assignment.Controllers;

import com.web.Assignment.DTO.AssignmentTableDTO;
import com.web.Assignment.DTO.DashboardStatsDTO;
import com.web.Assignment.Entity.Assignment;
import com.web.Assignment.Entity.User;
import com.web.Assignment.Services.AssignmentService;
import com.web.Assignment.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllAssignments(){
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createAssignment(@RequestBody Assignment assignment){
        return new ResponseEntity<>(assignmentService.createAssignment(assignment),HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAssignmentById(@PathVariable long id){
        return new ResponseEntity<>
                (assignmentService.getAssignmentById(id),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAssignmentById(@PathVariable long id){
        assignmentService.deleteAssignmentOfUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody Assignment updated) {
        Assignment assignment = assignmentService.getAssignmentById(id);

        assignment.setTitle(updated.getTitle());
        assignment.setSubject(updated.getSubject());
        assignment.setDueDate(updated.getDueDate());
        assignment.setDescription(updated.getDescription());
        assignment.setTime(updated.getTime());

        return assignmentService.updateAssignment(id , assignment);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<?> markAssignmentCompleted(@PathVariable Long id,Authentication authentication) {

        User user = userService.getCurrentUser();

        assignmentService.markAsCompleted(id, user);

        return ResponseEntity.ok("Assignment marked as completed");
    }

    @GetMapping("/my")
    public List<Assignment> myAssignments(Authentication auth) {
        User user = userService.getCurrentUser();
        return assignmentService.getAssignmentsForUser(user);
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
    try{
        User user = userService.getCurrentUser();
        return new ResponseEntity<>(assignmentService.getStats(user.getId()), HttpStatus.OK);
    }catch(Exception e){
        log.error("Exception ",e);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }

    @GetMapping("/recent")
    public List<AssignmentTableDTO> getRecentAssignments() {
        return assignmentService.getRecentAssignments();
    }
}
