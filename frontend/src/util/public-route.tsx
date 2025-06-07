import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/" replace /> : children;
};
