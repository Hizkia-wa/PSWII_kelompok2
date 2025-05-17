import React, { useState } from 'react';
import axios from 'axios';

function FormAddObjekRetribusi({ onSuccess }) {
  const [formData, setFormData] = useState({
    idLokasiObjekRetribusi: '',
    idJenisObjekRetribusi: '',
    kodeObjekRetribusi: '',
    noBangunan: '',
    jumlahLantai: 1,
    objekRetribusi: '',
    panjangTanah: 0,
    lebarTanah: 0,
    luasTanah: 0,
    panjangBangunan: 0,
    lebarBangunan: 0,
    luasBangunan: 0,
    alamat: '',
    latitude: '',
    longitude: '',
    keterangan: '',
    gambarDenahTanah: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === 'panjangTanah' || name === 'lebarTanah') {
        const panjang = name === 'panjangTanah' ? parseFloat(value) : parseFloat(formData.panjangTanah);
        const lebar = name === 'lebarTanah' ? parseFloat(value) : parseFloat(formData.lebarTanah);
        if (!isNaN(panjang) && !isNaN(lebar)) {
          newData.luasTanah = panjang * lebar;
        }
      }

      if (name === 'panjangBangunan' || name === 'lebarBangunan') {
        const panjang = name === 'panjangBangunan' ? parseFloat(value) : parseFloat(formData.panjangBangunan);
        const lebar = name === 'lebarBangunan' ? parseFloat(value) : parseFloat(formData.lebarBangunan);
        if (!isNaN(panjang) && !isNaN(lebar)) {
          newData.luasBangunan = panjang * lebar;
        }
      }

      return newData;
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.kodeObjekRetribusi) formErrors.kodeObjekRetribusi = "Kode objek retribusi harus diisi";
    if (!formData.objekRetribusi) formErrors.objekRetribusi = "Nama objek harus diisi";
    if (!formData.alamat) formErrors.alamat = "Alamat harus diisi";
    if (formData.panjangTanah <= 0) formErrors.panjangTanah = "Panjang tanah harus lebih besar dari 0";
    if (formData.lebarTanah <= 0) formErrors.lebarTanah = "Lebar tanah harus lebih besar dari 0";
    if (formData.panjangBangunan <= 0) formErrors.panjangBangunan = "Panjang bangunan harus lebih besar dari 0";
    if (formData.lebarBangunan <= 0) formErrors.lebarBangunan = "Lebar bangunan harus lebih besar dari 0";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8000/api/objek-retribusi', formData);
      alert('Data berhasil ditambahkan!');
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      console.error('Gagal menambahkan data:', err);
      alert('Terjadi kesalahan saat menambahkan data.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  };

  const labelStyle = {
    marginBottom: '10px',
    fontWeight: 'bold',
    display: 'block',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '25px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tambah Objek Retribusi</h2>

      {[
        { label: 'Kode Objek Retribusi', name: 'kodeObjekRetribusi' },
        { label: 'Nama Objek', name: 'objekRetribusi' },
        { label: 'No Bangunan', name: 'noBangunan' },
        { label: 'Jumlah Lantai', name: 'jumlahLantai', type: 'number' },
        { label: 'Panjang Tanah', name: 'panjangTanah', type: 'number' },
        { label: 'Lebar Tanah', name: 'lebarTanah', type: 'number' },
        { label: 'Luas Tanah', name: 'luasTanah', type: 'number', readOnly: true },
        { label: 'Panjang Bangunan', name: 'panjangBangunan', type: 'number' },
        { label: 'Lebar Bangunan', name: 'lebarBangunan', type: 'number' },
        { label: 'Luas Bangunan', name: 'luasBangunan', type: 'number', readOnly: true },
        { label: 'Alamat', name: 'alamat' },
        { label: 'ID Jenis Objek Retribusi', name: 'idJenisObjekRetribusi' },
        { label: 'ID Lokasi Objek Retribusi', name: 'idLokasiObjekRetribusi' },
      ].map(({ label, name, type = 'text', readOnly = false }) => (
        <div key={name} style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>{label}:</label>
          <input
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            readOnly={readOnly}
            style={{
              ...inputStyle,
              backgroundColor: readOnly ? '#e9ecef' : '#fff',
              cursor: readOnly ? 'not-allowed' : 'auto',
            }}
          />
          {errors[name] && <div style={errorStyle}>{errors[name]}</div>}
        </div>
      ))}

      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%',
          marginTop: '10px',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
      >
        Tambah
      </button>
    </form>
  );
}

export default FormAddObjekRetribusi;
