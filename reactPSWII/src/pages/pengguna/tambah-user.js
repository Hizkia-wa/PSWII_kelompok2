// pages/pengguna/tambah-user.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import axios from 'axios';

const TambahUser = () => {
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
  
  // State untuk error
  const [error, setError] = useState('');
  
  // Base URL API
  const API_URL = 'http://localhost:3001/api'; // Sesuaikan dengan URL API Anda
  
  // Generate token random
  const generateToken = (length = 5) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };
  
  // Effect untuk load status dan generate token saat komponen dimount
  useEffect(() => {
    // Generate token
    setFormData(prev => ({
      ...prev,
      token: generateToken()
    }));
    
    // Fetch status options
    const fetchStatusOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/status?tipe=user`);
        setStatusOptions(response.data);
      } catch (error) {
        console.error('Error fetching status options:', error);
        setError('Gagal mengambil data status');
      }
    };
    
    fetchStatusOptions();
  }, []);
  
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
    if (!formData.username || !formData.email || !formData.password || !formData.status) {
      setError('Username, email, password dan status harus diisi');
      return;
    }
    
    try {
      await axios.post(`${API_URL}/users`, formData);
      // Redirect ke halaman data user dengan pesan sukses
      navigate('/pengguna/data-user?sukses=tambah');
    } catch (error) {
      console.error('Error creating user:', error);
      setError(error.response?.data?.message || 'Gagal menambahkan user');
    }
  };
  
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
                <h5>Tambah User</h5>
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
                        placeholder="Masukkan username" 
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
                        placeholder="Masukkan Email" 
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
                        placeholder="Masukkan password" 
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
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
                        placeholder="Masukkan keterangan"
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
                    <button type="submit" className="btn btn-primary">Kirim</button>
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

export default TambahUser;