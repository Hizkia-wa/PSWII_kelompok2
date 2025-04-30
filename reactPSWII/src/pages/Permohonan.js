import { useEffect, useState } from "react";
import { getPermohonan, createPermohonan, deletePermohonan } from "../api";

export default function Permohonan() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    nama_penyewa: "",
    tanggal: "",
    keterangan: "",
  });
  const token = localStorage.getItem("token");

  const fetchData = () => {
    getPermohonan(token).then((res) => setData(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPermohonan(form, token);
    setForm({ nama_penyewa: "", tanggal: "", keterangan: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await deletePermohonan(id, token);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permohonan</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <input
          type="text"
          placeholder="Nama Penyewa"
          value={form.nama_penyewa}
          onChange={(e) => setForm({ ...form, nama_penyewa: e.target.value })}
          className="border p-2"
        />
        <input
          type="date"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Keterangan"
          value={form.keterangan}
          onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Tambah
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama Penyewa</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Keterangan</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border">
              <td className="border p-2">{item.nama_penyewa}</td>
              <td className="border p-2">{item.tanggal}</td>
              <td className="border p-2">{item.keterangan}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
