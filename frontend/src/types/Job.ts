export interface Job {
    id: string;
    company: string;
    position: string;
    salary?: string;
    dateApplied: string;
    stage: 'applied' | 'interview' | 'rejected' | 'offer';
    notes?: string;
}

export type JobStage = Job['stage'];