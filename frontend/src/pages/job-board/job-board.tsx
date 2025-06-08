import React, { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import {Job, JobStage} from "../../types/Job";
import {JobColumn} from "../../components/job-column/job-column";
import {AddJobModal} from "../../components/add-job-modal/add-job-modal";

const initialJobs: Job[] = [
    {
        id: '1',
        company: 'Google',
        position: 'Software Engineer',
        salary: '$130k - $180k',
        dateApplied: '2024-01-15',
        stage: 'applied',
        notes: 'Applied through referral'
    },
    {
        id: '2',
        company: 'Microsoft',
        position: 'Senior Frontend Developer',
        salary: '$120k - $160k',
        dateApplied: '2024-01-10',
        stage: 'interview',
        notes: 'Technical interview scheduled for next week'
    },
    {
        id: '3',
        company: 'Meta',
        position: 'Product Manager',
        salary: '$140k - $190k',
        dateApplied: '2024-01-05',
        stage: 'rejected',
        notes: 'Position filled internally'
    },
    {
        id: '4',
        company: 'Apple',
        position: 'iOS Developer',
        salary: '$125k - $170k',
        dateApplied: '2024-01-20',
        stage: 'offer',
        notes: 'Offer received! Negotiating salary'
    }
];

export function JobBoard() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [draggedJob, setDraggedJob] = useState<Job | null>(null);

    const handleDragStart = (e: React.DragEvent, job: Job) => {
        setDraggedJob(job);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, newStage: JobStage) => {
        e.preventDefault();
        if (draggedJob && draggedJob.stage !== newStage) {
            setJobs(jobs.map(job =>
                job.id === draggedJob.id
                    ? { ...job, stage: newStage }
                    : job
            ));
        }
        setDraggedJob(null);
    };

    const handleAddJob = (newJob: Omit<Job, 'id'>) => {
        const job: Job = {
            ...newJob,
            id: Date.now().toString()
        };
        setJobs([...jobs, job]);
    };

    const getJobsByStage = (stage: JobStage) => {
        return jobs.filter(job => job.stage === stage);
    };

    const columns = [
        { title: 'Applied', stage: 'applied' as JobStage, color: 'blue' },
        { title: 'Interview', stage: 'interview' as JobStage, color: 'orange' },
        { title: 'Rejected', stage: 'rejected' as JobStage, color: 'red' },
        { title: 'Offer', stage: 'offer' as JobStage, color: 'green' }
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
                                <h1 className="text-3xl font-bold text-gray-900">Job Application Tracker</h1>
                                <p className="text-gray-600 mt-1">Track your job applications and their progress</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
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
                                blue: 'bg-blue-50 text-blue-700 border-blue-200',
                                orange: 'bg-orange-50 text-orange-700 border-orange-200',
                                red: 'bg-red-50 text-red-700 border-red-200',
                                green: 'bg-green-50 text-green-700 border-green-200'
                            };

                            return (
                                <div key={stage} className={`p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
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
                            color={color}
                            count={getJobsByStage(stage).length}
                        />
                    ))}
                </div>
            </div>

            <AddJobModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddJob}
            />
        </div>
    );
}