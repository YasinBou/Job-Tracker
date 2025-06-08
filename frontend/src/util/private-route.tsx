import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
