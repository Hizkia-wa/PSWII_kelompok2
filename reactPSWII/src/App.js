import React from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
