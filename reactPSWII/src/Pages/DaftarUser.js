// src/Pages/DaftarUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DaftarUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      console.log('Data user berhasil diambil:', response.data); // <- ini tambahan logging
      setUsers(response.data.data);
    } catch (error) {
      console.error('Gagal fetch data user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daftar User</h2>
      <div className="flex gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Cari User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-1/3"
        />
        <select className="border px-4 py-2 rounded-lg">
          <option>Semua Status</option>
          <option>Aktif</option>
          <option>Tidak Aktif</option>
        </select>
        <select className="border px-4 py-2 rounded-lg">
          <option>Semua Role</option>
          <option>Admin</option>
          <option>Pengguna</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg ml-auto hover:bg-green-600">
          + Tambah User
        </button>
      </div>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Keterangan</th>
            <th className="py-2 px-4">Token</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.userId} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.keterangan}</td>
              <td className="py-2 px-4">{user.token || '-'}</td>
              <td className="py-2 px-4">
                {user.isDeleted ? (
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    Tidak Aktif
                  </span>
                ) : (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                    Aktif
                  </span>
                )}
              </td>
              <td className="py-2 px-4 flex gap-2">
                <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DaftarUser;
