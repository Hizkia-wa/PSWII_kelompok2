import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard"; // Fixed path: Pages -> pages
import Login from "./pages/Login"; // Fixed path: Pages -> pages
import Permohonan from "./pages/Permohonan"; // Fixed path: Pages -> pages

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