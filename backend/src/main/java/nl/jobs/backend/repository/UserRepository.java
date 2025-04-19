package nl.jobs.backend.repository;

import jakarta.validation.constraints.NotBlank;
import nl.jobs.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(@NotBlank String username);
}
