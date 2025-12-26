package com.web.Assignment.Config;

import com.web.Assignment.Services.UserServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserServiceImpl userserviceimpl;

    @Override
    protected void doFilterInternal(HttpServletRequest req,  //Incoming Request
                                    @NonNull HttpServletResponse res,  //Outgoing Request
                                    @NonNull FilterChain chain)  //Allows Filter Chaining
            throws ServletException, IOException, IOException {

        String path = req.getServletPath(); //Gets the request Endpoints part



        if (path.startsWith("/auth")) {
            chain.doFilter(req, res);    //If starts with auth no Jwt validation
            return;
        }
        String auth = req.getHeader("Authorization");

        if (auth != null && auth.startsWith("Bearer ")) {  //Checks whether the authorization starts with bearer
            String token = auth.substring(7);  //Remove bearer keyword from start Extract Only jwtToken
            try{
                String username = jwtUtil.extractUsername(token); //Extracts Username from the token
                UserDetails user = userserviceimpl.loadUserByUsername(username);   //Checks whether the user is present in database

                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user, null, user.getAuthorities());


                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }catch(Exception e) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        chain.doFilter(req, res);
    }
}
