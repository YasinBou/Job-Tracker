package nl.jobs.backend.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import nl.jobs.backend.model.Job;
import nl.jobs.backend.model.User;
import nl.jobs.backend.repository.JobRepository;
import nl.jobs.backend.security.SecurityUtil;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final SecurityUtil securityUtil;

    public List<Job> getJobsForCurrentUser() {
        User user = securityUtil.getCurrentUser();
        return jobRepository.findByUserId(user.getId());
    }

    public Job createJobForCurrentUser(Job job) {
        User user = securityUtil.getCurrentUser();
        job.setUser(user);
        return jobRepository.save(job);
    }

    public Job updateJobForCurrentUser(Long jobId, Job updatedJob) {
        User user = securityUtil.getCurrentUser();
        Job existingJob = jobRepository.findById(jobId)
                .filter(job -> job.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new EntityNotFoundException("Job not found or not yours"));

        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setPosition(updatedJob.getPosition());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setDateApplied(updatedJob.getDateApplied());
        existingJob.setStage(updatedJob.getStage());
        existingJob.setNotes(updatedJob.getNotes());

        return jobRepository.save(existingJob);
    }

    public void deleteJobForCurrentUser(Long jobId) {
        User user = securityUtil.getCurrentUser();
        Job job = jobRepository.findById(jobId)
                .filter(j -> j.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new EntityNotFoundException("Job not found or not yours"));

        jobRepository.delete(job);
    }
}
