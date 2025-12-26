package com.web.Assignment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AssignmentTableDTO {

    private Long id;
    private String subject;
    private String title;
    private LocalDate dueDate;

    private long completedStudents;
    private long pendingStudents;
}
