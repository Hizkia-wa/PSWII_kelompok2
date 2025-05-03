import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';

const DataUser = () => {
  // State untuk menyimpan data user
  const [users, setUsers] = useState([]);
  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');
  // State untuk modal konfirmasi hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  // State untuk alert/notifikasi
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });


  const API_URL = 'http://localhost:8000/api/users'; 
  // Fungsi untuk mengambil data user
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setAlert({
        show: true,
        message: 'Gagal mengambil data user',
        type: 'danger'
      });
    }
  };

  // Effect untuk mengambil data saat komponen dimount
  useEffect(() => {
    fetchUsers();
    
    // Cek jika ada parameter sukses di URL
    const params = new URLSearchParams(window.location.search);
    const success = params.get('sukses');
    
    if (success === 'tambah') {
      setAlert({
        show: true,
        message: 'User berhasil ditambahkan',
        type: 'success'
      });
    } else if (success === 'edit') {
      setAlert({
        show: true,
        message: 'User berhasil diperbarui',
        type: 'success'
      });
    } else if (success === 'hapus') {
      setAlert({
        show: true,
        message: 'User berhasil dihapus',
        type: 'success'
      });
    }
    
   
    const timeout = setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Fungsi untuk menampilkan modal konfirmasi hapus
  const handleShowDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  // Fungsi untuk menghapus user
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${API_URL}/users/${userIdToDelete}`);
      setShowDeleteModal(false);
      setUserIdToDelete(null);
      
      // Refresh data setelah hapus
      fetchUsers();
      
      setAlert({
        show: true,
        message: 'User berhasil dihapus',
        type: 'success'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      setAlert({
        show: true,
        message: 'Gagal menghapus user',
        type: 'danger'
      });
    }
  };

  // Filter user berdasarkan pencarian
  const filteredUsers = users.filter(user => {
    return (
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.token.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="main-container">
      <Header />
      <div className="content-container">
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-fluid">
            {/* Alert */}
            {alert.show && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.message}
                <button type="button" className="btn-close" onClick={() => setAlert({ show: false, message: '', type: '' })}></button>
              </div>
            )}
            
            <div className="row mb-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h2>Data User</h2>
                
                <div className="d-flex">
                  <div className="search-box me-3">
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Cari..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-outline-secondary">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                  
                  <Link to="/pengguna/tambah-user" className="btn btn-primary">
                    <i className="fas fa-plus me-1"></i> Tambah User
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h5>Daftar User</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>No</th>
                        <th>Token</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Keterangan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.token}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.keterangan}</td>
                            <td>
                              <span className={`badge bg-${user.status === 'Aktif' ? 'success' : 'danger'}`}>
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <Link to={`/pengguna/detail-user/${user.id}`} className="btn btn-info btn-sm me-1" title="Detail">
                                <i className="fas fa-eye"></i>
                              </Link>
                              <Link to={`/pengguna/edit-user/${user.id}`} className="btn btn-warning btn-sm me-1" title="Edit">
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button 
                                onClick={() => handleShowDeleteModal(user.id)} 
                                className="btn btn-danger btn-sm" 
                                title="Hapus"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">Tidak ada data user.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Konfirmasi Hapus</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                Apakah Anda yakin ingin menghapus user ini?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataUser;