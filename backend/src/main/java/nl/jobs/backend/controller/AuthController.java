package nl.jobs.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import nl.jobs.backend.DTO.LoginDTO;
import nl.jobs.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        try {
            Map<String, Object> body = authService.loginAndSetCookie(loginDTO, response);
            return ResponseEntity.ok(body);
        } catch (BadCredentialsException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        return ResponseEntity.ok(Map.of("username", authentication.getName()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        String expiredCookie = "jwt=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0";
        response.setHeader("Set-Cookie", expiredCookie);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}