import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    getDashboardData(token).then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Total User: {data.total_user}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Permohonan Aktif: {data.permohonan_aktif}
        </div>
        <div className="bg-white p-4 rounded shadow">
          Objek Retribusi: {data.objek_retribusi}
        </div>
      </div>
    </div>
  );
}
