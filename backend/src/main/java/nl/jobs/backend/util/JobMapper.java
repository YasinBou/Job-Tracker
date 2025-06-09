package nl.jobs.backend.util;

import nl.jobs.backend.DTO.JobDTO;
import nl.jobs.backend.model.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public JobDTO toDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setCompany(job.getCompany());
        dto.setPosition(job.getPosition());
        dto.setSalary(job.getSalary());
        dto.setDateApplied(job.getDateApplied());
        dto.setStage(job.getStage());
        dto.setNotes(job.getNotes());
        return dto;
    }

    public Job toEntity(JobDTO dto) {
        Job job = new Job();
        job.setCompany(dto.getCompany());
        job.setPosition(dto.getPosition());
        job.setSalary(dto.getSalary());
        job.setDateApplied(dto.getDateApplied());
        job.setStage(dto.getStage());
        job.setNotes(dto.getNotes());
        return job;
    }
}
