package com.web.Assignment.Services;

import com.web.Assignment.Entity.Notification;
import com.web.Assignment.Entity.Reminder;
import com.web.Assignment.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void sendNotification(Reminder reminder) {

        Notification notification = new Notification();
        notification.setUser(reminder.getUser());
        notification.setMessage(
                "⏰ Reminder: Assignment '" +
                        reminder.getAssignment().getTitle() +
                        "Of Subject " + reminder.getAssignment().getSubject() +
                        "' is due soon!"
        );

        notificationRepository.save(notification);
    }
}
