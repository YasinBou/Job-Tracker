import { AlertTriangle, Trash2, X } from "lucide-react";
import { Job } from "../../types/Job";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  job: Job | null;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  job,
}: DeleteConfirmModalProps) => {
  if (!isOpen || !job) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Delete Application
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this job application? This action
            cannot be undone.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-900">
                {job.position}
              </span>
              <span className="text-gray-500">at</span>
              <span className="font-semibold text-gray-900">{job.company}</span>
            </div>
            <div className="text-sm text-gray-600">
              Applied on{" "}
              {new Date(job.dateApplied).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
