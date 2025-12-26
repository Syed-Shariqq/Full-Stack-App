package com.web.Assignment.Config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET =
            "my-secret-key-my-secret-key-my-secret-key";

    public String generateToken(String username) {
        return Jwts.builder()           //start building the token
                .setSubject(username)       // set the jwtToken for specific user
                .setIssuedAt(new Date())    //Set issue time of JwtToken
                .setExpiration(
                        new Date(System.currentTimeMillis() + 30L * 24 * 60 * 60 * 1000)    //Setting the expiration Time of the JwtToken
                )
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))   //Using hmacShaKey256 Algorithm to make the token secure
                .compact();  // Converts everything into JWT String
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()    //Validate or Read JwtToken
                .setSigningKey(SECRET.getBytes())
                .build()
                .parseClaimsJws(token)  //Checks whether the token is valid or invalid
                .getBody() //Gets the payload part of Token (Subject, Issued at, Expiry)
                .getSubject();  //Reads which user it belongs to.
    }
}
