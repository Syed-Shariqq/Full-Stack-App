package com.web.Assignment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {

    private long totalAssignments;
    private long myAssignments;
    private long pendingSubmissions;
    private long fullyCompletedAssignments;

}
