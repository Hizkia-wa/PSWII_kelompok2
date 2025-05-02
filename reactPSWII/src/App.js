import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import DataUser from "./pages/pengguna/datauser.js";
import DetailUser from "./pages/pengguna/detail-user.js";
import EditUser from "./pages/pengguna/edit-user.js";
import TambahUser from "./pages/pengguna/tambah-user.js";
import Permohonan from "./pages/Permohonan";
import Login from "./pages/Login";
import "./App.css";

function App() {
  // You can add authentication state here if needed
  const isAuthenticated = true; // Change this based on your authentication logic

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="app">
          <Sidebar />
          <div className="main">
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
               
                <Route path="/pengguna/data-user" element={<DataUser />} />
                <Route path="/pengguna/detail-user/:id" element={<DetailUser />} />
                <Route path="/pengguna/edit-user/:id" element={<EditUser />} />
                <Route path="/pengguna/tambah-user" element={<TambahUser />} />
                
                {/* Permohonan Routes */}
                <Route path="/permohonan" element={<Permohonan />} />
               
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;