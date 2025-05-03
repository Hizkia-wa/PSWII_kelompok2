import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'detail'
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    token: '',
    password: '',
    status: 'Aktif',
    keterangan: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = 'http://localhost:8000/api'; // Adjust this to your Laravel API URL

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      token: '',
      password: '',
      status: 'Aktif',
      keterangan: ''
    });
    setErrorMessage('');
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    
    if (type === 'add') {
      resetForm();
    } else if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        token: user.token || '',
        password: '', // Don't populate the password for security reasons
        status: user.status || 'Aktif',
        keterangan: user.keterangan || ''
      });
    }
    
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType('');
    setSelectedUser(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Prepare data for submission
    const submissionData = { ...formData };
    // Remove password from submission if it's empty during edit
    if (modalType === 'edit' && !submissionData.password) {
      delete submissionData.password;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

      if (modalType === 'add') {
        await axios.post(`${API_URL}/users`, submissionData, config);
      } else if (modalType === 'edit' && selectedUser) {
        await axios.put(`${API_URL}/users/${selectedUser.id}`, submissionData, config);
      }
      
      fetchUsers(); // Refresh the user list
      closeModal();
    } catch (error) {
      const errorMsg = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : error.message;
      setErrorMessage(`Gagal mengirim form: ${errorMsg}`);
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await axios.delete(`${API_URL}/users/${userId}`);
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const renderFormModal = () => {
    const title = modalType === 'add' ? 'Tambah User' : 'Edit User';
    const submitButtonText = modalType === 'add' ? 'Kirim' : 'Simpan';
    
    return (
      <div className="modal-container">
        <div className="modal-content">
          <h2>{title}</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleInputChange}
                placeholder="Masukkan username"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange}
                placeholder="Masukkan Email"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Token</label>
              <input 
                type="text" 
                name="token" 
                value={formData.token} 
                onChange={handleInputChange}
                placeholder="Masukkan Token"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange}
                placeholder="Masukkan password"
                required={modalType === 'add'}
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleInputChange}
              >
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Keterangan</label>
              <input 
                type="text" 
                name="keterangan" 
                value={formData.keterangan} 
                onChange={handleInputChange}
                placeholder="Masukkan keterangan"
              />
            </div>
            
            <div className="modal-buttons">
              <button type="button" className="btn-cancel" onClick={closeModal}>Batal</button>
              <button type="submit" className="btn-submit">{submitButtonText}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderDetailModal = () => {
    if (!selectedUser) return null;
    
    return (
      <div className="modal-container">
        <div className="modal-content detail-content">
          <h2>Detail User</h2>
          
          <div className="detail-item">
            <div className="detail-label">Username</div>
            <div className="detail-value">{selectedUser.username}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Email</div>
            <div className="detail-value">{selectedUser.email}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Token</div>
            <div className="detail-value">{selectedUser.token}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Password</div>
            <div className="detail-value">••••••••</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Status</div>
            <div className="detail-value">{selectedUser.status}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Keterangan</div>
            <div className="detail-value">{selectedUser.keterangan}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Di perbarui pada</div>
            <div className="detail-value">{selectedUser.updated_at}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Di buat pada</div>
            <div className="detail-value">{selectedUser.created_at}</div>
          </div>
          
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={closeModal}>Batal</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="user-management">
      <header className="data-header">
        <h1>Data User</h1>
        <div className="action-container">
          <button className="add-button" onClick={() => openModal('add')}>
            <FaPlus /> Tambah User
          </button>
        </div>
      </header>

      <div className="user-list-container">
        <h2>Daftar User</h2>
        
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <table className="user-table">
            <thead>
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
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.token}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.keterangan}</td>
                    <td>
                      <span className={`status-badge ${user.status === 'Aktif' ? 'active' : 'inactive'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button 
                        className="btn-view" 
                        onClick={() => openModal('detail', user)}
                        title="Lihat Detail"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="btn-edit" 
                        onClick={() => openModal('edit', user)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(user.id)}
                        title="Hapus"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">Tidak ada data user</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        modalType === 'detail' ? renderDetailModal() : renderFormModal()
      )}
    </div>
  );
};

export default UserManagement;