package nl.jobs.backend.service;

import nl.jobs.backend.exceptions.UserRegistrationException;
import nl.jobs.backend.model.User;
import nl.jobs.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void registerUser(String username, String email, String rawPassword) {
        List<String> errors = validateRegistration(username, email);

        if (!errors.isEmpty()) {
            throw new UserRegistrationException(errors);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));

        userRepository.save(user);
    }

    private List<String> validateRegistration(String username, String email) {
        List<String> errors = new ArrayList<>();

        if (userRepository.findByUsername(username) != null) {
            errors.add("Username already exists!");
        }

        if (userRepository.findByEmail(email) != null) {
            errors.add("Email already exists!");
        }

        return errors;
    }
}
