package nl.jobs.backend.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import nl.jobs.backend.DTO.LoginDTO;
import nl.jobs.backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public Map<String, Object> loginAndSetCookie(LoginDTO loginDTO, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Authenticated user object.
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails.getUsername());

        // Build secure cookie manually
        String cookie = buildCookie(token);
        setHeaders(response, cookie);

        // Return user info (without token)
        Map<String, Object> body = new HashMap<>();
        body.put("username", userDetails.getUsername());
        return body;
    }

    public void setHeaders(HttpServletResponse response, String cookie) {
        response.setHeader("Set-Cookie", cookie);
        response.setHeader("Cache-Control", "no-store");
        response.setHeader("X-Content-Type-Options", "nosniff");
    }

    public String buildCookie(String token) {
        return "jwt=" + token + ";"
                + " HttpOnly;"
                + " Secure;"
                + " Path=/;"
                + " Max-Age=" + (24 * 60 * 60) + ";"
                + " SameSite=Strict";
    }
}
