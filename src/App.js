import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import NavBar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import AddTaskPage from "./pages/AddTaskPage";
import RewardsPage from "./pages/RewardsPage";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage pagename={"abcd"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/addtask" element={<AddTaskPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
