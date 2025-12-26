package com.web.Assignment.Controllers;

import com.web.Assignment.Entity.User;
import com.web.Assignment.Services.AssignmentService;
import com.web.Assignment.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AssignmentService assignmentService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllUsers(){
        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id){
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete-all")
    public ResponseEntity<?> deleteAllUsers(){
        userService.deleteAll();
        return new ResponseEntity<>("All the users are deleted", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(){
        assignmentService.deleteAllAssignments();
        return new ResponseEntity<>("All assignments are deleted", HttpStatus.OK);
    }
}
