import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header.js';
import Sidebar from '../../Components/Sidebar.js';
import axios from 'axios';

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State untuk user data
  const [userData, setUserData] = useState(null);
  
  // State untuk error dan loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Base URL API
  const API_URL = 'http://localhost:3001/api'; // Sesuaikan dengan URL API Anda
  
  // Fetch user data saat komponen dimount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Gagal mengambil data user');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [id]);
  
  // Format date untuk tampilan
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
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
              <div className="card-header bg-primary text-white">
                <h5>Daftar User</h5>
              </div>
              <div className="card-body">
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : userData ? (
                  <div className="row">
                    <div className="col-12">
                      <h3 className="text-center mb-4">Detail User</h3>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Username</h6>
                            <p className="fs-5">{userData.username}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Email</h6>
                            <p className="fs-5">{userData.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Token</h6>
                            <p className="fs-5">{userData.token}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Password</h6>
                            <p className="fs-5">{userData.password}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Status</h6>
                            <p className="fs-5">
                              <span className={`badge bg-${userData.status === 'Aktif' ? 'success' : 'danger'}`}>
                                {userData.status}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Keterangan</h6>
                            <p className="fs-5">{userData.role || '-'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Di perbarui pada</h6>
                            <p className="fs-5">{formatDate(userData.updated_at) || '-'}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h6 className="text-muted">Di buat pada</h6>
                            <p className="fs-5">{formatDate(userData.created_at) || '-'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row mt-4">
                        <div className="col-12 text-center">
                          <button 
                            className="btn btn-primary me-2" 
                            onClick={() => navigate(`/pengguna/edit-user/${id}`)}
                          >
                            Edit User
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            onClick={() => navigate('/pengguna/data-user')}
                          >
                            Kembali
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;