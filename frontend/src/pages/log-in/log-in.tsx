import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlueButton } from "../../components/blue-button/blue-button";
import { NoteModal } from "../../components/note-modal/note-modal";
import { useAuth } from "../../context/auth-context";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await login(formData.username, formData.password);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage(null);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <NoteModal title="Login to Your Account">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <BlueButton title="Login" />
        </form>
        {errorMessage && (
          <p className="mt-2 text-red-600 font-semibold">{errorMessage}</p>
        )}
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </NoteModal>
    </div>
  );
};
