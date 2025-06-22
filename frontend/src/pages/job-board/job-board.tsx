import { Briefcase, Plus } from "lucide-react";
import React, { useState } from "react";
import { AddJobModal } from "../../components/add-job-modal/add-job-modal";
import { DeleteConfirmModal } from "../../components/delete-confirm-modal/delete-confirm-modal";
import { EditJobModal } from "../../components/edit-job-modal/edit-job-modal";
import { JobColumn } from "../../components/job-column/job-column";
import { useJobs } from "../../context/job-context";
import { Job, JobStage } from "../../types/Job";

export function JobBoard() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    setDraggedJob(job);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, newStage: JobStage) => {
    e.preventDefault();
    if (draggedJob && draggedJob.stage !== newStage) {
      await updateJob({ ...draggedJob, stage: newStage }); // wait for updateJob to finish
    }
    setDraggedJob(null);
  };

  const handleAddJob = async (newJob: Omit<Job, "id">) => {
    await addJob(newJob);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const handleSaveJob = async (updatedJob: Job) => {
    await updateJob(updatedJob);
    setEditingJob(null);
  };

  const handleDeleteJob = (jobToDelete: Job) => {
    setDeletingJob(jobToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingJob) {
      await deleteJob(deletingJob.id);
      setDeletingJob(null);
    }
  };

  const getJobsByStage = (stage: JobStage) => {
    return jobs.filter((job) => job.stage === stage);
  };

  const columns = [
    { title: "Applied", stage: "applied" as JobStage, color: "blue" },
    { title: "Interview", stage: "interview" as JobStage, color: "orange" },
    { title: "Rejected", stage: "rejected" as JobStage, color: "red" },
    { title: "Offer", stage: "offer" as JobStage, color: "green" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Job Application Tracker
                </h1>
                <p className="text-gray-600 mt-1">
                  Track your job applications and their progress
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Application
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {columns.map(({ title, stage, color }) => {
              const count = getJobsByStage(stage).length;
              const colorClasses = {
                blue: "bg-blue-50 text-blue-700 border-blue-200",
                orange: "bg-orange-50 text-orange-700 border-orange-200",
                red: "bg-red-50 text-red-700 border-red-200",
                green: "bg-green-50 text-green-700 border-green-200",
              };

              return (
                <div
                  key={stage}
                  className={`p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}
                >
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm font-medium">{title}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Job Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {columns.map(({ title, stage, color }) => (
            <JobColumn
              key={stage}
              title={title}
              stage={stage}
              jobs={getJobsByStage(stage)}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
              color={color}
              count={getJobsByStage(stage).length}
            />
          ))}
        </div>
      </div>

      <AddJobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddJob}
      />

      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingJob(null);
        }}
        onSave={handleSaveJob}
        job={editingJob}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingJob(null);
        }}
        onConfirm={handleConfirmDelete}
        job={deletingJob}
      />
    </div>
  );
}
