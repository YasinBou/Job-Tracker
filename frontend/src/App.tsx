import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {JOB_BOARD, LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE} from "./constants/routes";
import { Navbar } from "./pages/nav-bar/nav-bar";
import { Landing } from "./pages/landing/landing";
import { Login } from "./pages/log-in/log-in";
import { Register } from "./pages/register/register";
import {AuthProvider, useAuth} from "./context/auth-context";
import {PublicRoute} from "./util/public-route";
import {JobBoard} from "./pages/job-board/job-board";
import {PrivateRoute} from "./util/private-route";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
      <Router>
          <div>
              <Navbar isLoggedIn={isAuthenticated} />
              <Routes>
                  <Route path={LANDING_PAGE}
                         element={
                      <PublicRoute>
                          <Landing />
                      </PublicRoute>
                  }
                  />
                  <Route
                      path={LOGIN_PAGE}
                      element={
                          <PublicRoute>
                              <Login />
                          </PublicRoute>
                      }
                  />
                  <Route
                      path={REGISTER_PAGE}
                      element={
                          <PublicRoute>
                              <Register />
                          </PublicRoute>
                      }
                  />
                  <Route
                    path={JOB_BOARD}
                    element={
                      <PrivateRoute>
                          <JobBoard />
                      </PrivateRoute>
                  }
                  />
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
