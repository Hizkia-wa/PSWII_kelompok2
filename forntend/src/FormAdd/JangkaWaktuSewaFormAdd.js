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
      idJenisJangkaWaktu: formData.idJenisJangkaWaktu,
      jangkaWaktuSewa: formData.jangkaWaktuSewa,
      keterangan: formData.keterangan || '',
      isDefault: formData.isDefault,
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
    <div className="jangka-waktu-container">
      <h2 className="form-title">Tambah Jenis Jangka Waktu</h2>
      <div className="form-divider"></div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jenisJangkaWaktu">Jenis Jangka Waktu</label>
          <select
            id="jenisJangkaWaktu"
            value={formData.idJenisJangkaWaktu}
            onChange={(e) => setFormData({ ...formData, idJenisJangkaWaktu: e.target.value })}
            required
            className="form-control"
          >
            <option value="">Pilih Jenis Jangka Waktu</option>
            {jenisList.map(jenis => (
              <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                {jenis.jenisJangkaWaktu}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="jangkaWaktuSewa">Jangka Waktu Sewa</label>
          <input
            type="text"
            id="jangkaWaktuSewa"
            value={formData.jangkaWaktuSewa}
            onChange={(e) => setFormData({ ...formData, jangkaWaktuSewa: e.target.value })}
            placeholder="Contoh: 1 Bulan / 12 Minggu"
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="keterangan">Keterangan</label>
          <textarea
            id="keterangan"
            value={formData.keterangan}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            placeholder="Masukkan keterangan"
            className="form-control"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
            />
            <span className="checkbox-text">Default?</span>
          </label>
        </div>
        
        <div className="form-buttons">
          <button type="button" className="btn btn-cancel">Batal</button>
          <button type="submit" className="btn btn-save">Simpan</button>
        </div>
      </form>
      
      <style jsx>{`
        /* CSS untuk form Tambah Jenis Jangka Waktu */
        .jangka-waktu-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: #ffffff;
        }
        
        .form-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }
        
        .form-divider {
          height: 1px;
          background-color: #e0e0e0;
          margin-bottom: 30px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #333;
        }
        
        .form-control {
          width: 100%;
          padding: 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 15px;
          color: #495057;
          transition: border-color 0.2s;
        }
        
        .form-control:focus {
          border-color: #2463eb;
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
        }
        
        select.form-control {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 40px;
        }
        
        textarea.form-control {
          min-height: 120px;
          resize: vertical;
        }
        
        .checkbox-group {
          margin-top: 15px;
        }
        
        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .checkbox-container input[type="checkbox"] {
          width: 18px;
          height: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
        
        .checkbox-text {
          font-size: 16px;
          color: #333;
        }
        
        .form-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
        }
        
        .btn {
          padding: 10px 20px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-cancel {
          background-color: #f8f9fa;
          border: 1px solid #ced4da;
          color: #495057;
        }
        
        .btn-cancel:hover {
          background-color: #e9ecef;
        }
        
        .btn-save {
          background-color: #2463eb;
          border: 1px solid #2463eb;
          color: #ffffff;
        }
        
        .btn-save:hover {
          background-color: #1e50c8;
        }
        
        /* Responsif untuk layar kecil */
        @media (max-width: 768px) {
          .jangka-waktu-container {
            padding: 15px;
          }
          
          .form-buttons {
            flex-direction: column-reverse;
          }
          
          .btn {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default JangkaWaktuSewaFormAdd;