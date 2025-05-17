// src/pages/TarifObjekRetribusi/TarifAdd.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const TarifObjekRetribusiFormAdd = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    idObjekRetribusi: '',
    idJenisJangkaWaktu: '',
    tanggalDinilai: '',
    namaPenilai: '',
    nominalTarif: ''
  });

  const [objekRetribusiOptions, setObjekRetribusiOptions] = useState([]);
  const [jenisJangkaWaktuOptions, setJenisJangkaWaktuOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [objekRes, jangkaRes] = await Promise.all([
          axios.get('http://localhost:8000/api/objek-retribusi'),
          axios.get('http://localhost:8000/api/jenis-jangka-waktu')
        ]);
        setObjekRetribusiOptions(objekRes.data.data || []);
        setJenisJangkaWaktuOptions(jangkaRes.data.data || []);
        setLoadingOptions(false);
      } catch (error) {
        console.error('Gagal fetch opsi dropdown:', error);
        setErrorLoading('Gagal memuat data dropdown');
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/tarif-objek-retribusi', form);
      alert('Data berhasil ditambahkan.');
      navigate('/tarif');
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  if (loadingOptions) return <div>Loading data dropdown...</div>;
  if (errorLoading) return <div style={{ color: 'red' }}>{errorLoading}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.headerTitle}>
          <div style={styles.blueBar}></div>
          <h2 style={styles.heading}>Tambah Tarif Objek Retribusi</h2>
        </div>
      </div>

      <p style={styles.instructions}>
        Silakan isi formulir di bawah ini untuk menambahkan tarif objek retribusi baru.
      </p>

      <div style={styles.divider}></div>

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* ✅ Perbaikan dropdown Objek Retribusi */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Objek Retribusi <span style={styles.required}>*</span>
          </label>
          <select
            name="idObjekRetribusi"
            value={form.idObjekRetribusi}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Pilih Objek Retribusi</option>
              {objekRetribusiOptions.map((objek) => (
                <option key={objek.idObjekRetribusi} value={objek.idObjekRetribusi}>
                  {objek.objekRetribusi}
                </option>
              ))}
          </select>
          <div style={styles.helperText}>Pilih objek retribusi yang tersedia</div>
        </div>

        {/* Dropdown Jenis Jangka Waktu */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Jenis Jangka Waktu <span style={styles.required}>*</span>
          </label>
          <select
            name="idJenisJangkaWaktu"
            value={form.idJenisJangkaWaktu}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Pilih Jenis Jangka Waktu</option>
            {jenisJangkaWaktuOptions.map((jangka) => (
              <option key={jangka.idJenisJangkaWaktu} value={jangka.idJenisJangkaWaktu}>
                {jangka.jenisJangkaWaktu}
              </option>
            ))}
          </select>
          <div style={styles.helperText}>Pilih jenis jangka waktu yang sesuai</div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Tanggal Dinilai <span style={styles.required}>*</span>
          </label>
          <input
            type="date"
            name="tanggalDinilai"
            value={form.tanggalDinilai}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Nama Penilai <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="namaPenilai"
            placeholder="Masukkan nama penilai"
            value={form.namaPenilai}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Nominal Tarif <span style={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="nominalTarif"
            placeholder="Masukkan nominal tarif"
            value={form.nominalTarif}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.helperText}>Dalam satuan Rupiah (Rp)</div>
        </div>

        <div style={styles.formActions}>
          <button type="submit" style={styles.saveButton}>
            <span style={styles.saveIcon}>💾</span> Simpan Data
          </button>
          <Link to="/tarif" style={styles.cancelButton}>
            <span style={styles.cancelIcon}>✖</span> Batal
          </Link>
        </div>
      </form>
    </div>
  );
};

// Embedded styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  blueBar: {
    width: '4px',
    height: '32px',
    backgroundColor: '#4054b2',
    marginRight: '15px',
    borderRadius: '2px',
  },
  heading: {
    color: '#333',
    fontSize: '24px',
    margin: '0',
  },
  instructions: {
    color: '#666',
    margin: '0 0 20px 0',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '20px 0',
  },
  form: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333',
  },
  required: {
    color: '#d32f2f',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  helperText: {
    fontSize: '12px',
    color: '#777',
    marginTop: '5px',
  },
  formActions: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  saveIcon: {
    marginRight: '8px',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  cancelIcon: {
    marginRight: '8px',
  },
};

export default TarifObjekRetribusiFormAdd;