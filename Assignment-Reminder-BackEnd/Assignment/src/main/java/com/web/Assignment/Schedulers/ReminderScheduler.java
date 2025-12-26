package com.web.Assignment.Schedulers;

import com.web.Assignment.Entity.Reminder;
import com.web.Assignment.Repository.ReminderRepository;
import com.web.Assignment.Services.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReminderScheduler {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private NotificationService notificationService;

    @Scheduled(fixedRate = 1000000)// every 5 seconds
    @Transactional
    public void processReminders() {

        System.out.println("SCHEDULER RUNNING...");

        List<Reminder> reminders =
                reminderRepository.findPendingReminders(
                        LocalDateTime.now()
                );

        System.out.println("REMINDERS FOUND = " + reminders.size());

        for (Reminder reminder : reminders) {
            System.out.println("PROCESSING REMINDER ID = " + reminder.getId());

            notificationService.sendNotification(reminder);

            reminder.setSent(true);
            reminderRepository.save(reminder);
        }
    }
}

