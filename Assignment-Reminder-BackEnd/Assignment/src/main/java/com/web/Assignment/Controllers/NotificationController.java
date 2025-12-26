package com.web.Assignment.Controllers;

import com.web.Assignment.Entity.Notification;
import com.web.Assignment.Entity.User;
import com.web.Assignment.Repository.NotificationRepository;
import com.web.Assignment.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/notifications")
@Slf4j
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Notification> getUnreadNotifications(Principal principal) {

        User user = userService.findByUsername(principal.getName());
        return notificationRepository.findByUserAndIsReadFalse(user);
    }

    @GetMapping("/test")
    public ResponseEntity<?> testNotifications() {
        try{
            return new ResponseEntity<>(notificationRepository.findAll() , HttpStatus.OK);
        }catch(Exception e){
            log.error("Error", e);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

    }
    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        n.setRead(true);
        notificationRepository.save(n);
    }

}

