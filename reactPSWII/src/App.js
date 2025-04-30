import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Permohonan from "./Pages/Permohonan";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/permohonan" element={<Permohonan />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
