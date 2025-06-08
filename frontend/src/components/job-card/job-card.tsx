import { Building2, Calendar, DollarSign, StickyNote } from "lucide-react";
import React from "react";
import { Job } from "../../types/Job";

interface JobCardProps {
  job: Job;
  onDragStart: (e: React.DragEvent, job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onDragStart }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, job)}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-all duration-200 hover:border-gray-300 group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-700">
            {job.position}
          </h3>
          <div className="flex items-center text-gray-600 text-xs">
            <Building2 className="w-3 h-3 mr-1" />
            <span>{job.company}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-500 text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(job.dateApplied)}</span>
        </div>

        {job.salary && (
          <div className="flex items-center text-gray-500 text-xs">
            <DollarSign className="w-3 h-3 mr-1" />
            <span>{job.salary}</span>
          </div>
        )}

        {job.notes && (
          <div className="flex items-start text-gray-500 text-xs">
            <StickyNote className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{job.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};
