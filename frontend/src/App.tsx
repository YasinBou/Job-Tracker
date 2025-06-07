import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE } from "./constants/routes";
import { Navbar } from "./pages/nav-bar/nav-bar";
import { Landing } from "./pages/landing/landing";
import { Login } from "./pages/log-in/log-in";
import { Register } from "./pages/register/register";
import {AuthProvider, useAuth} from "./context/auth-context";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
      <Router>
        <div>
          <Navbar isLoggedIn={isAuthenticated} />
          <Routes>
            <Route path={LANDING_PAGE} element={<Landing />} />
            <Route path={LOGIN_PAGE} element={<Login />} />
            <Route path={REGISTER_PAGE} element={<Register />} />
          </Routes>
        </div>
      </Router>
  );
}

function App() {
  return (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
  );
}

export default App;
