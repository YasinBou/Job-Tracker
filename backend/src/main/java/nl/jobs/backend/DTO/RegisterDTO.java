package nl.jobs.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    @NotBlank
    @Size(min = 3, max = 30)
    private String username;
    @NotBlank
    private String email;
    @NotBlank
    @Size(min = 6, max = 100)
    private String password;
}
