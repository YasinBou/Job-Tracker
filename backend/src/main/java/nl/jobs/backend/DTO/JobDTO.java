package nl.jobs.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String company;
    @NotBlank
    private String position;
    private String salary;
    @NotNull
    private LocalDate dateApplied;
    @NotNull
    private JobStage stage;
    private String notes;

    public enum JobStage {
        APPLIED,
        INTERVIEW,
        REJECTED,
        OFFER
    }
}

