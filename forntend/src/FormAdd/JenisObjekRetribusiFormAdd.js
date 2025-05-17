import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JenisObjekRetribusiFormAdd = () => {
  const [jenisObjekRetribusi, setJenis] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/jenis-objek-retribusi", {
        jenisObjekRetribusi,
        keterangan,
      })
      .then(() => {
        // Show success notification
        setShowNotification(true);
        
        // Navigate automatically after a short delay
        setTimeout(() => {
          navigate("/jenisobjekretribusi");
        }, 2000); // Navigate after 2 seconds
      })
      .catch(() => alert("Gagal menambah data."));
  };

  const handleCancel = () => {
    navigate("/jenis-objek-retribusi");
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "0 15px",
      position: "relative", // For notification positioning
    },
    formCard: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      marginBottom: "30px",
    },
    formHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    verticalLine: {
      width: "6px",
      height: "30px",
      backgroundColor: "#3a56a7",
      marginRight: "15px",
      borderRadius: "3px",
    },
    title: {
      color: "#3a4756",
      fontSize: "24px",
      fontWeight: "600",
      margin: "0",
    },
    instruction: {
      color: "#666",
      marginBottom: "25px",
      borderBottom: "1px solid #eee",
      paddingBottom: "15px",
    },
    formGroup: {
      marginBottom: "25px",
    },
    formLabel: {
      display: "block",
      fontWeight: "500",
      marginBottom: "8px",
      color: "#333",
    },
    required: {
      color: "#e74c3c",
    },
    formControl: {
      width: "100%",
      padding: "12px 15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      transition: "border-color 0.3s",
    },
    formHint: {
      color: "#888",
      fontSize: "14px",
      marginTop: "5px",
    },
    guidelines: {
      backgroundColor: "#f8f9fa",
      borderLeft: "4px solid #3a56a7",
      padding: "15px 20px",
      marginBottom: "25px",
      borderRadius: "0 4px 4px 0",
    },
    guidelinesTitle: {
      color: "#3a4756",
      fontSize: "16px",
      marginTop: "0",
      marginBottom: "10px",
    },
    guidelinesList: {
      paddingLeft: "20px",
      margin: "0",
    },
    guidelinesItem: {
      marginBottom: "5px",
      color: "#555",
    },
    formActions: {
      display: "flex",
      gap: "15px",
    },
    btnPrimary: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#4CAF50",
      color: "white",
      gap: "10px",
      transition: "background-color 0.3s",
    },
    btnCancel: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      color: "#666",
      gap: "10px",
      transition: "background-color 0.3s",
    },
    notification: {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "15px 25px",
      borderRadius: "4px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      zIndex: 1000,
      gap: "10px",
      animation: "slideIn 0.3s ease-out forwards",
    },
    notificationIcon: {
      fontSize: "20px",
    },
    notificationText: {
      fontSize: "16px",
      fontWeight: "500",
    },
    "@keyframes slideIn": {
      "0%": {
        transform: "translateX(100%)",
        opacity: 0,
      },
      "100%": {
        transform: "translateX(0)",
        opacity: 1,
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Success Notification */}
      {showNotification && (
        <div style={styles.notification}>
          <span style={styles.notificationIcon}>✓</span>
          <span style={styles.notificationText}>
            Data berhasil disimpan! Mengalihkan ke halaman daftar...
          </span>
        </div>
      )}

      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <div style={styles.verticalLine}></div>
          <h2 style={styles.title}>Tambah Jenis Objek Retribusi</h2>
        </div>
        
        <div style={styles.instruction}>
          Silakan isi formulir di bawah ini untuk menambahkan jenis objek retribusi baru.
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              Nama Jenis Objek <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              style={styles.formControl}
              value={jenisObjekRetribusi}
              onChange={(e) => setJenis(e.target.value)}
              placeholder="Masukkan nama jenis objek"
              required
              maxLength={100}
            />
            <div style={styles.formHint}>
              Contoh: Parkir Kendaraan, Sewa Gedung, Kebersihan Pasar
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Keterangan</label>
            <textarea
              style={styles.formControl}
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              rows={5}
            ></textarea>
          </div>
          
          <div style={styles.guidelines}>
            <h3 style={styles.guidelinesTitle}>Petunjuk Pengisian:</h3>
            <ul style={styles.guidelinesList}>
              <li style={styles.guidelinesItem}>
                <strong>Nama Jenis Objek:</strong> Wajib diisi dengan maksimal 100 karakter.
              </li>
              <li style={styles.guidelinesItem}>
                <strong>Keterangan:</strong> Opsional, dapat diisi dengan deskripsi atau informasi tambahan tentang jenis objek retribusi.
              </li>
            </ul>
          </div>
          
          <div style={styles.formActions}>
            <button type="submit" style={styles.btnPrimary}>
              <i className="fa fa-save"></i> Simpan Data
            </button>
            <button 
              type="button" 
              style={styles.btnCancel} 
              onClick={handleCancel}
            >
              <i className="fa fa-times"></i> Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JenisObjekRetribusiFormAdd;