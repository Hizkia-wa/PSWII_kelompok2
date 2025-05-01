import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-gray-800 text-white ${
        open ? "w-64" : "w-16"
      } duration-300 h-screen p-4`}
    >
      <button onClick={() => setOpen(!open)} className="mb-4">
        {open ? "⬅️" : "➡️"}
      </button>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/permohonan">Permohonan</Link>
        </li>
        <li>
          <Link to="/daftaruser">Daftar User</Link>
        </li>
      </ul>
    </div>
  );
}
