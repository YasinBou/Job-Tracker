package nl.jobs.backend.exceptions;

import java.util.List;

public class UserRegistrationException extends RuntimeException {
    private final List<String> errors;

    public UserRegistrationException(List<String> errors) {
        super("User registration failed: " + String.join("\n", errors));
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}

