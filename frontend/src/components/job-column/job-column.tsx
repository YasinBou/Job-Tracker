import React from "react";
import { Job, JobStage } from "../../types/Job";
import { JobCard } from "../job-card/job-card";

interface JobColumnProps {
  title: string;
  stage: JobStage;
  jobs: Job[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, stage: JobStage) => void;
  onDragStart: (e: React.DragEvent, job: Job) => void;
  onEdit: (job: Job) => void;
  color: string;
  count: number;
}

export const JobColumn = ({
  title,
  stage,
  jobs,
  onDragOver,
  onDrop,
  onDragStart,
  onEdit,
  color,
  count,
}: JobColumnProps) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    orange: "bg-orange-50 border-orange-200",
    red: "bg-red-50 border-red-200",
    green: "bg-green-50 border-green-200",
  };

  const headerColorClasses = {
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    red: "bg-red-100 text-red-800",
    green: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`rounded-lg border-2 border-dashed ${colorClasses[color as keyof typeof colorClasses]} min-h-[600px] p-4`}
      >
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${headerColorClasses[color as keyof typeof headerColorClasses]}`}
        >
          <span>{title}</span>
          <span className="ml-2 bg-white bg-opacity-60 px-2 py-0.5 rounded-full text-xs">
            {count}
          </span>
        </div>

        <div
          className="space-y-3 min-h-[500px]"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, stage)}
        >
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDragStart={onDragStart}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
