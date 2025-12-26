package com.web.Assignment.DTO;

import com.web.Assignment.Entity.Assignment;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AssignmentResponseDto {

    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String subject;
    private LocalDateTime createdAt;
    private String time;
    private boolean completed;

    public AssignmentResponseDto(Assignment a) {
        this.id = a.getId();
        this.time = a.getTime();
        this.subject = a.getSubject();
        this.title = a.getTitle();
        this.description = a.getDescription();
        this.dueDate = a.getDueDate();
        this.createdAt = a.getCreatedAt();
        this.completed = a.isCompleted();
    }
}
