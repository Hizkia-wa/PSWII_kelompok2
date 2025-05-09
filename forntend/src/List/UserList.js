// src/pages/UserList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api/users";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get(API).then((res) => {
      setUsers(res.data.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      axios.delete(`${API}/${id}`).then(fetchUsers);
    }
  };

  return (
    <div>
      <h2>Daftar User</h2>
      <Link to="/user/add">+ Tambah User</Link>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.isDeleted ? "Nonaktif" : "Aktif"}</td>
              <td>{u.keterangan}</td>
              <td>
                <Link to={`/user/edit/${u.userId}`}>Edit</Link> |{" "}
                <button onClick={() => handleDelete(u.userId)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
