import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormEditObjekRetribusi({ id, onSuccess }) {
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

  useEffect(() => {
    axios.get(`http://localhost:8000/api/objek-retribusi/${id}`)
      .then((res) => {
        const data = res.data.data;
        setFormData({
          idLokasiObjekRetribusi: data.idLokasiObjekRetribusi,
          idJenisObjekRetribusi: data.idJenisObjekRetribusi,
          kodeObjekRetribusi: data.kodeObjekRetribusi,
          noBangunan: data.noBangunan,
          jumlahLantai: data.jumlahLantai,
          objekRetribusi: data.objekRetribusi,
          panjangTanah: data.panjangTanah,
          lebarTanah: data.lebarTanah,
          luasTanah: data.luasTanah,
          panjangBangunan: data.panjangBangunan,
          lebarBangunan: data.lebarBangunan,
          luasBangunan: data.luasBangunan,
          alamat: data.alamat,
          latitude: data.latitude,
          longitude: data.longitude,
          keterangan: data.keterangan,
          gambarDenahTanah: data.gambarDenahTanah
        });
      })
      .catch((err) => console.error('Gagal mengambil data:', err));
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/objek-retribusi/${id}`, formData);
      alert('Data berhasil diperbarui!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Gagal memperbarui data:', err);
      alert('Terjadi kesalahan saat memperbarui data.');
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

  const textareaStyle = {
    ...inputStyle,
    minHeight: '60px',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '650px',
        margin: '20px auto',
        padding: '25px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Objek Retribusi</h2>

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
        { label: 'Latitude', name: 'latitude' },
        { label: 'Longitude', name: 'longitude' },
        { label: 'Gambar Denah Tanah (URL)', name: 'gambarDenahTanah' },
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
        </div>
      ))}

      <div style={{ marginBottom: '15px' }}>
        <label style={labelStyle}>Keterangan:</label>
        <textarea
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          style={textareaStyle}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%',
          marginTop: '10px',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Update
      </button>
    </form>
  );
}

export default FormEditObjekRetribusi;
