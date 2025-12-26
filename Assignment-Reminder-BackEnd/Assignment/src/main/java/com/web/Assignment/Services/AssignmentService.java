package com.web.Assignment.Services;

import com.web.Assignment.DTO.AssignmentTableDTO;
import com.web.Assignment.DTO.DashboardStatsDTO;
import com.web.Assignment.Entity.Assignment;
import com.web.Assignment.Entity.AssignmentStatus;
import com.web.Assignment.Entity.Role;
import com.web.Assignment.Entity.User;
import com.web.Assignment.Repository.AssignmentRepository;
import com.web.Assignment.Repository.AssignmentStatusRepository;
import com.web.Assignment.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentStatusRepository assignmentStatusRepository;

    @Autowired
    private UserService userService;

    public Assignment createAssignment(Assignment assignment) {

        User user = userService.getCurrentUser();
        assignment.setUser(user);

        Assignment savedAssignment = assignmentRepository.save(assignment);

        List<User> students = userRepository.findByRole(Role.USER);

        for (User student : students) {
            AssignmentStatus status = new AssignmentStatus();
            status.setAssignment(savedAssignment);
            status.setUser(student);
            status.setCompleted(false);
            assignmentStatusRepository.save(status);
        }

        return savedAssignment;
    }

    public Assignment updateAssignment(Long id, Assignment updated) {
        Assignment existing = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        existing.setTitle(updated.getTitle());
        existing.setSubject(updated.getSubject());
        existing.setDueDate(updated.getDueDate());
        existing.setDescription(updated.getDescription());

        return assignmentRepository.save(existing);
    }


    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(long id) {
        return assignmentRepository.findByIdAndUser(id, userService.getCurrentUser())
                .orElseThrow(() -> new RuntimeException("Assignment not Found"));
    }

    public Assignment getAssignment(long id){
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not Found"));
    }

    public void deleteAssignmentOfUser(long id) {
        Assignment assignment = getAssignmentById(id);
        assignmentRepository.delete(assignment);
    }

    public void deleteAllAssignments(){
        assignmentRepository.deleteAll();
    }

    @Transactional
    public void markAsCompleted(Long assignmentId, User user) {

        AssignmentStatus status = assignmentStatusRepository
                .findByAssignmentIdAndUserId(assignmentId, user.getId())
                .orElseGet(() -> {
                    AssignmentStatus newStatus = new AssignmentStatus();
                    newStatus.setAssignment(
                            assignmentRepository.findById(assignmentId)
                                    .orElseThrow(() -> new RuntimeException("Assignment not found"))
                    );
                    newStatus.setUser(user);
                    newStatus.setCompleted(false);
                    return assignmentStatusRepository.save(newStatus);
                });

        status.setCompleted(true);
    }


    public List<Assignment> getAssignmentsForUser(User user) {

        List<Assignment> assignments = assignmentRepository.findAll();

        for (Assignment a : assignments) {
            boolean completed = assignmentStatusRepository
                    .findByAssignmentIdAndUserId(a.getId(), user.getId())
                    .map(AssignmentStatus::isCompleted)
                    .orElse(false);

            a.setCompleted(completed);
        }

        return assignments;
    }

    public DashboardStatsDTO getStats(Long teacherId) {

        long totalAssignments = assignmentRepository.count();
        long myAssignments = assignmentRepository.countByUser_Id(teacherId);
        long pending = assignmentStatusRepository.countAssignmentsWithPending();
        long completed = assignmentStatusRepository.countFullyCompletedAssignments();

        return new DashboardStatsDTO(
                totalAssignments,
                myAssignments,
                pending,
                completed
        );
    }

    public List<AssignmentTableDTO> getRecentAssignments() {

        List<Assignment> assignments = assignmentRepository.findAll();

        return assignments.stream().map(a -> {

            long completed = assignmentStatusRepository
                    .countByAssignmentIdAndCompletedTrue(a.getId());

            long pending = assignmentStatusRepository
                    .countByAssignmentIdAndCompletedFalse(a.getId());

            return new AssignmentTableDTO(
                    a.getId(),
                    a.getSubject(),
                    a.getTitle(),
                    a.getDueDate(),
                    completed,
                    pending
            );

        }).toList();

    }

}
