package nl.jobs.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import nl.jobs.backend.model.Job;
import java.time.LocalDate;

@Getter
@Setter
public class JobDTO {
    private Long id;
    @NotBlank
    private String company;
    @NotBlank
    private String position;
    private String salary;
    @NotNull
    private LocalDate dateApplied;
    @NotNull
    private Job.JobStage stage;  // Use enum type here
    private String notes;
}
