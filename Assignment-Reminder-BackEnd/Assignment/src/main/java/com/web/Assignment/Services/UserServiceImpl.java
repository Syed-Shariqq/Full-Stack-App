package com.web.Assignment.Services;

import com.web.Assignment.Entity.User;
import com.web.Assignment.Repository.UserRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserDetailsService {
                                    /*UserDetailService is inbuild we just need
                                    to implement it and make some modifications according to our needs */
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {

        String normalized =
                username.trim().toLowerCase().replace(" ", "");

        User user = userRepository.findByUsername(normalized)
                    .orElseThrow(() -> new RuntimeException("User not found")); //Finding whether the user exists or not.

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())    //If user found return user with username,
                .password(user.getPassword())        //password with user password, role of the user
                .roles(user.getRole().name())
                .build();
    }

}
