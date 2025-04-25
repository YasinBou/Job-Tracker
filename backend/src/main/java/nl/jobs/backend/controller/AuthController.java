package nl.jobs.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import nl.jobs.backend.DTO.LoginDTO;
import nl.jobs.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
        Map<String, Object> body = authService.loginAndSetCookie(loginDTO, response);
        return ResponseEntity.ok(body);
    }
}