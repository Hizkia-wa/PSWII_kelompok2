import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import Permohonan from "./pages/Permohonan";
import UserManagement from "./pages/Pengguna/UserManagement"; 

import Login from "./pages/Login";
import "./App.css";

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // akan true jika token ada
  }, []);

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
}

function AppRoutes({ isAuthenticated }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return isAuthenticated ? (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/permohonan" element={<Permohonan />} />
            <Route path="/pengguna/data-user" element={<UserManagement />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppWrapper;