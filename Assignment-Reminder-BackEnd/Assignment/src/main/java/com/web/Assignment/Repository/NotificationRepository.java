package com.web.Assignment.Repository;


import com.web.Assignment.Entity.Notification;
import com.web.Assignment.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserAndIsReadFalse(User user);
}
