import {
  Building2,
  Calendar,
  DollarSign,
  Edit3,
  StickyNote,
  Trash2,
} from "lucide-react";
import React from "react";
import { Job } from "../../types/Job";

interface JobCardProps {
  job: Job;
  onDragStart: (e: React.DragEvent, job: Job) => void;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onDragStart,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit(job);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to delete your application for the ${job.position} position at ${job.company}?`
      )
    ) {
      onDelete(job);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, job)}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-all duration-200 hover:border-gray-300 group relative"
    >
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={handleEditClick}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
          title="Edit application"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
          title="Delete application"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-between items-start mb-3 pr-16">
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
