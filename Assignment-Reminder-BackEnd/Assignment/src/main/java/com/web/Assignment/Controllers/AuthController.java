package com.web.Assignment.Controllers;

import com.web.Assignment.Config.JwtUtil;
import com.web.Assignment.Entity.AuthResponse;
import com.web.Assignment.Entity.Role;
import com.web.Assignment.Entity.User;
import com.web.Assignment.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping({"/signup","/signup/"})
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword())); //Encode the password and set encoded password in the databases
            user.setEmail(user.getEmail());
            user.setUsername(user.getUsername());
            user.setRole(Role.USER);
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            log.error("Something went wrong",e);
            return new ResponseEntity<>( "User Created" ,HttpStatus.NOT_FOUND); //If user not found return {User Not Found}
           }
        }

        @PostMapping("/login")
        public ResponseEntity<?> logIn(@RequestBody User user){
            try{
                /* Checking whether the user already exists or if exists the user is authenticated?
                 and the credentials are correct? */
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        user.getUsername(),user.getPassword()
                ));
                User dbUser = userService.findByUsername(user.getUsername());
                String token = jwtUtil.generateToken(user.getUsername()); //Generating JwtToken for logIn

                return new ResponseEntity<>(new AuthResponse(token, dbUser.getRole().name()), HttpStatus.OK);
            }catch(Exception e){
                log.error("User not Found",e);
                return new ResponseEntity<>("User not found or Not Authenticated",HttpStatus.NOT_FOUND);
            }
        }
}

