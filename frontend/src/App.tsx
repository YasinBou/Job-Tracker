import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { LANDING_PAGE, LOGIN_PAGE, REGISTER_PAGE } from "./constants/routes";
import { Navbar } from "./pages/nav-bar/nav-bar";
import { Landing } from "./pages/landing/landing";
import { Login } from "./pages/log-in/log-in";
import { Register } from "./pages/register/register";


function App() {
  return (
    <Router>
      <div>
        <Navbar isLoggedIn={false} />
        <Routes>
          <Route path={LANDING_PAGE} element={<Landing />} />
          <Route path={LOGIN_PAGE} element={<Login />} />
          <Route path={REGISTER_PAGE} element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
