import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JangkaWaktuSewaFormAdd = () => {
  const [formData, setFormData] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktuSewa: '',
    keterangan: '',
    isDefault: false
  });

  const [jenisList, setJenisList] = useState([]);

  // Ambil data jenis jangka waktu dari API Laravel
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/jenis-jangka-waktu')
      .then(res => {
        setJenisList(res.data.data); // Pastikan struktur response sesuai dengan ini
      })
      .catch(err => {
        console.error('Gagal mengambil data jenis jangka waktu:', err);
      });
  }, []);

  // Kirim form ke API Laravel
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      idJenisJangkaWaktu: formData.idJenisJangkaWaktu,  // Menggunakan formData.idJenisJangkaWaktu
      jangkaWaktuSewa: formData.jangkaWaktuSewa,      // Pastikan data valid
      keterangan: formData.keterangan || '',          // Jika ada, jika tidak kosongkan
      isDefault: formData.isDefault,                  // Pastikan ini boolean atau tidak ada
    };

    axios.post('http://localhost:8000/api/jangka-waktu-sewa', data)
      .then(response => {
        console.log('Data berhasil ditambahkan', response);
      })
      .catch(error => {
        console.error('Gagal menambahkan data:', error);
        alert('Terjadi kesalahan. Cek log untuk detail.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Jangka Waktu Sewa</h2>

      <label>
        Jenis Jangka Waktu:
        <select
          value={formData.idJenisJangkaWaktu}
          onChange={(e) => setFormData({ ...formData, idJenisJangkaWaktu: e.target.value })}
          required
        >
          <option value="">Pilih Jenis Jangka Waktu</option>
          {jenisList.map(jenis => (
            <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
              {jenis.jenisJangkaWaktu}
            </option>
          ))}
        </select>
      </label>

      <label>
        Jangka Waktu Sewa:
        <input
          type="text"
          value={formData.jangkaWaktuSewa}
          onChange={(e) => setFormData({ ...formData, jangkaWaktuSewa: e.target.value })}
          placeholder="Contoh: 1 Bulan / 12 Minggu"
          required
        />
      </label>

      <label>
        Keterangan:
        <textarea
          value={formData.keterangan}
          onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
          placeholder="Keterangan tambahan (opsional)"
        />
      </label>

      <label>
        Default? 
        <input
          type="checkbox"
          checked={formData.isDefault}
          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
        />
      </label>

      <button type="submit">Simpan</button>
    </form>
  );
};

export default JangkaWaktuSewaFormAdd;
