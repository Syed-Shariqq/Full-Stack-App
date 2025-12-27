package com.web.Assignment.Controllers;

import com.web.Assignment.Entity.User;
import com.web.Assignment.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

   @GetMapping("/me")
   public ResponseEntity<?> getCurrentLoggedInUser(){
       User user = userService.getCurrentUser();
       return new ResponseEntity<>(user , HttpStatus.OK);
   }

}
