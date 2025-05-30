import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PeruntukanSewaFormEdit() {
  const { id } = useParams();
  const [jenisKegiatan, setJenisKegiatan] = useState('');
  const [peruntukanSewa, setPeruntukanSewa] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/api/peruntukan-sewa/${id}`);
        const data = res.data.data;
        setJenisKegiatan(data.jenisKegiatan);
        setPeruntukanSewa(data.peruntukanSewa);
        setKeterangan(data.keterangan || '');
        setLoading(false);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/peruntukan-sewa/${id}`, {
        jenisKegiatan,
        peruntukanSewa,
        keterangan
      });
      alert('Berhasil mengupdate data!');
      navigate('/peruntukansewa');
    } catch (err) {
      console.error('Gagal mengupdate data:', err);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      borderLeft: '5px solid #3949AB',
      paddingLeft: '15px',
    },
    title: {
      margin: '0',
      color: '#333',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    formContainer: {
      paddingBottom: '30px',
    },
    instruction: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '25px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#333',
      fontSize: '16px',
      fontWeight: '500',
    },
    requiredLabel: {
      color: 'red',
      marginLeft: '5px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    helperText: {
      color: '#666',
      fontSize: '12px',
      marginTop: '5px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '10px',
    },
    updateButton: {
      backgroundColor: '#FF9800',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    updateIcon: {
      marginRight: '8px',
      fontSize: '18px',
    },
    cancelButton: {
      backgroundColor: '#f4f4f4',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '12px 20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    cancelIcon: {
      marginRight: '8px',
      fontSize: '18px',
      color: '#666',
    },
    loading: {
      textAlign: 'center',
      padding: '50px 0',
      color: '#666',
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          Memuat data...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Edit Peruntukan Sewa</h2>
      </div>
      
      <div style={styles.formContainer}>
        <p style={styles.instruction}>
          Silakan edit formulir di bawah ini untuk mengubah data peruntukan sewa.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Jenis Kegiatan
              <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan jenis kegiatan"
              value={jenisKegiatan}
              onChange={(e) => setJenisKegiatan(e.target.value)}
              required
              style={styles.input}
            />
            <div style={styles.helperText}>
              Contoh: Seminar, Workshop, Rapat
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Peruntukan Sewa
              <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan peruntukan sewa"
              value={peruntukanSewa}
              onChange={(e) => setPeruntukanSewa(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Keterangan
            </label>
            <textarea
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              style={styles.textarea}
            />
          </div>
          
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.updateButton}>
              <span style={styles.updateIcon}>🔄</span>
              Update Data
            </button>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={() => navigate('/peruntukan-sewa')}
            >
              <span style={styles.cancelIcon}>✖</span>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeruntukanSewaFormEdit;