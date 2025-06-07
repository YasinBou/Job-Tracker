import { Link } from "react-router-dom";
import { BlueButton } from "../../components/blue-button/blue-button";
import { NoteModal } from "../../components/note-modal/note-modal";

export const Landing = () => {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <NoteModal title="Welcome to Your Job Tracker!">
          <p>
            This app helps you stay organized during your job search. Track job
            applications, upcoming interviews, different resume versions, and
            personal notes—all in one place.
          </p>
          <Link to={"/login"} className="mt-4 block">
            <BlueButton title={"Get Started!"} />
          </Link>
        </NoteModal>
      </div>
  );
};
