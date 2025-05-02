// pages/pengguna/edit-user.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State untuk form
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    token: '',
    status: '',
    keterangan: ''
  });
  
  // State untuk status options
  const [statusOptions, setStatusOptions] = useState([]);
  
  // State untuk error dan loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Base URL API
  const API_URL = 'http://localhost:3001/api'; // Sesuaikan dengan URL API Anda
  
  // Fetch user data dan status options saat komponen dimount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await axios.get(`${API_URL}/users/${id}`);
        
        // Fetch status options
        const statusResponse = await axios.get(`${API_URL}/status?tipe=user`);
        
        setFormData({
          username: userResponse.data.username,
          email: userResponse.data.email,
          password: '', // Password field kosong di edit
          token: userResponse.data.token,
          status: userResponse.data.status_id,
          keterangan: userResponse.data.keterangan || ''
        });
        
        setStatusOptions(statusResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.username || !formData.email || !formData.status) {
      setError('Username, email, dan status harus diisi');
      return;
    }
    
    try {
      // Data untuk update
      const updateData = {
        username: formData.username,
        email: formData.email,
        status_id: formData.status,
        keterangan: formData.keterangan
      };
      
      // Jika password diisi, tambahkan ke data update
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      await axios.put(`${API_URL}/users/${id}`, updateData);
      
      // Redirect ke halaman data user dengan pesan sukses
      navigate('/pengguna/data-user?sukses=edit');
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.message || 'Gagal memperbarui user');
    }
  };
  
  if (loading) {
    return (
      <div className="main-container">
        <Header />
        <div className="content-container">
          <Sidebar />
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="main-container">
      <Header />
      <div className="content-container">
        <Sidebar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-12">
                <h2>Data User</h2>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h5>Edit User</h5>
              </div>
              <div className="card-body">
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        name="username" 
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="token" className="form-label">Token</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="token" 
                        name="token" 
                        value={formData.token}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        placeholder="Kosongkan jika tidak ingin mengubah password" 
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <small className="text-muted">Kosongkan jika tidak ingin mengubah password</small>
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select 
                        className="form-select" 
                        id="status" 
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Pilih status</option>
                        {statusOptions.map(status => (
                          <option key={status.id} value={status.id}>
                            {status.nama_status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="keterangan" className="form-label">Keterangan</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="keterangan" 
                        name="keterangan" 
                        value={formData.keterangan}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => navigate('/pengguna/data-user')}
                    >
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;