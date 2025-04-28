// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import DaftarUser from './Pages/DaftarUser';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/daftar-user" element={<DaftarUser />} />
            {/* Tambahkan route lainnya di sini */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
