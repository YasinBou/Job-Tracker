package nl.jobs.backend.security;

import lombok.RequiredArgsConstructor;
import nl.jobs.backend.model.User;
import nl.jobs.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails userDetails) {
            username = userDetails.getUsername();
        } else {
            throw new IllegalStateException("User is not authenticated");
        }

        return userRepository.findByUsername(username);
    }
}