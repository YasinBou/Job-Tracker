package nl.jobs.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nl.jobs.backend.DTO.RegisterDTO;
import nl.jobs.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDTO registerDTO) {
        try {
            userService.registerUser(registerDTO.getUsername(), registerDTO.getEmail(), registerDTO.getPassword());
            return ResponseEntity.status(201).body("User registered successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
