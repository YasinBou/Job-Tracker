package nl.jobs.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String company;
    @NotBlank
    private String position;
    private String salary;
    @NotNull
    private LocalDate dateApplied;
    @NotNull
    @Enumerated(EnumType.STRING)
    private JobStage stage;
    private String notes;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public enum JobStage {
        APPLIED,
        INTERVIEW,
        REJECTED,
        OFFER
    }
}