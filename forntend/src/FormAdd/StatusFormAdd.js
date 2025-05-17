import React, { useState } from 'react';
import axios from 'axios';

function StatusFormAdd({ onSuccess }) {
  const [namaStatus, setNamaStatus] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:8000/api/status', {
        namaStatus,
        keterangan,
        idJenisStatus: 1 // sesuaikan jika dinamis
      });
      
      // Tampilkan notifikasi sukses
      setNotification({
        show: true,
        message: 'Status berhasil ditambahkan!',
        type: 'success'
      });
      
      // Reset form
      setNamaStatus('');
      setKeterangan('');
      
      // Sembunyikan notifikasi setelah 5 detik
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
        onSuccess(); // Panggil callback sukses
      }, 5000);
      
    } catch (error) {
      console.error('Gagal menambahkan status:', error);
      
      // Tampilkan notifikasi error
      setNotification({
        show: true,
        message: `Gagal menambahkan status: ${error.response?.data?.message || error.message}`,
        type: 'error'
      });
      
      // Sembunyikan notifikasi error setelah 5 detik
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Style untuk notifikasi
  const getNotificationStyle = () => {
    const baseStyle = {
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideDown 0.3s ease-out'
    };
    
    if (notification.type === 'success') {
      return {
        ...baseStyle,
        backgroundColor: '#d1fae5',
        color: '#065f46',
        border: '1px solid #a7f3d0'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        border: '1px solid #fecaca'
      };
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Notifikasi */}
      {notification.show && (
        <div style={getNotificationStyle()}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontSize: '18px' }}>
              {notification.type === 'success' ? '✅' : '❌'}
            </span>
            {notification.message}
          </div>
          <button
            onClick={() => setNotification({ show: false, message: '', type: '' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: notification.type === 'success' ? '#065f46' : '#b91c1c'
            }}
          >
            ✖
          </button>
        </div>
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '15px',
        marginBottom: '20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          color: '#333',
          fontSize: '20px',
          fontWeight: '600',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingLeft: '15px'
        }}>
          <span style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '4px',
            height: '100%',
            backgroundColor: '#4f46e5',
            borderRadius: '2px'
          }}></span>
          Tambah Status
        </h3>
      </div>
      
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '30px'
      }}>
        Silakan isi formulir di bawah ini untuk menambahkan status baru.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={{
          marginBottom: '20px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '16px'
          }}>
            Nama Status
            <span style={{
              color: '#ef4444',
              marginLeft: '4px'
            }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan nama status"
            value={namaStatus}
            onChange={(e) => setNamaStatus(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              transition: 'border-color 0.15s ease-in-out',
              outline: 'none'
            }}
          />
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginTop: '6px'
          }}>
            Contoh: Aktif, Tidak Aktif, Pending
          </div>
        </div>
        
        <div style={{
          marginBottom: '20px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '16px'
          }}>
            Keterangan
          </label>
          <textarea
            placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              minHeight: '100px',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px'
        }}>
          <button 
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '10px 16px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              backgroundColor: isSubmitting ? '#9ae6b4' : '#4ade80',
              color: '#fff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ marginRight: '8px', fontSize: '18px' }}>💾</span>
            {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
          </button>
          <button 
            type="button"
            onClick={() => onSuccess()}
            disabled={isSubmitting}
            style={{
              padding: '10px 16px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              border: '1px solid #d1d5db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ marginRight: '8px', fontSize: '18px' }}>✖️</span>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default StatusFormAdd;
