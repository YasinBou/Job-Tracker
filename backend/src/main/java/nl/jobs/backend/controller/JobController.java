package nl.jobs.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nl.jobs.backend.DTO.JobDTO;
import nl.jobs.backend.model.Job;
import nl.jobs.backend.service.JobService;
import nl.jobs.backend.util.JobMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;
    private final JobMapper jobMapper;

    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobs = jobService.getJobsForCurrentUser()
                .stream()
                .map(jobMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(jobs);
    }

    @PostMapping
    public ResponseEntity<JobDTO> createJob(@Valid @RequestBody JobDTO jobDTO) {
        Job job = jobMapper.toEntity(jobDTO);
        Job created = jobService.createJobForCurrentUser(job);
        return ResponseEntity.ok(jobMapper.toDTO(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id, @Valid @RequestBody JobDTO jobDTO) {
        Job job = jobMapper.toEntity(jobDTO);
        Job updated = jobService.updateJobForCurrentUser(id, job);
        return ResponseEntity.ok(jobMapper.toDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJobForCurrentUser(id);
        return ResponseEntity.noContent().build();
    }
}