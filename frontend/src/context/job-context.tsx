import React, { createContext, useContext, useEffect, useState } from "react";
import { Job } from "../types/Job";
import { useAuth } from "./auth-context";

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => void;
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  updateJob: (job: Job) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth(); // get user from auth context
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    if (!user) {
      setJobs([]); // no user, clear jobs
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/jobs", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const normalizedJobs = data.map((job: Job) => ({
          ...job,
          stage: job.stage.toLowerCase(),
        }));
        setJobs(normalizedJobs);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refetch jobs whenever user changes (login/logout)
  useEffect(() => {
    fetchJobs();
  }, [user]);

  const addJob = async (job: Omit<Job, "id">) => {
    try {
      const res = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(job),
      });

      if (res.ok) {
        const newJob = await res.json();
        setJobs((prev) => [
          ...prev,
          { ...newJob, stage: newJob.stage.toLowerCase() },
        ]);
      } else {
        console.error("Failed to add job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const updateJob = async (job: Job) => {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j))); // optimistic update

    try {
      const res = await fetch(`http://localhost:8080/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        console.error("Failed to update job");
        // rollback if needed
      }
    } catch (error) {
      console.error("Error updating job:", error);
      // rollback if needed
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{ jobs, loading, fetchJobs, addJob, updateJob, deleteJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used within a JobProvider");
  return context;
};
