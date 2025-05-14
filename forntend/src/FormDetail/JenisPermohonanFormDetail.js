import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const JenisPermohonanFormDetail = () => {
  const [data, setData] = useState({
    namaJenis: "",
    keterangan: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/permohonan") // contoh endpoint
      .then((res) => {
        console.log(res.data); // pastikan ini muncul di console browser
        setData(res.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
      });
  }, []);
  

  const styles = {
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0",
      padding: "24px",
    },
    header: {
      backgroundColor: "#536878",
      color: "white",
      padding: "16px 24px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "16px",
    },
    detailGroup: {
      marginBottom: "20px",
    },
    label: {
      fontWeight: "bold",
      color: "#333",
    },
    value: {
      marginTop: "4px",
      padding: "10px 12px",
      backgroundColor: "#f9f9ff",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    loadingText: {
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      color: "#536878",
    },
  };

  if (loading) return <p style={styles.loadingText}>Memuat detail data...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>Detail Jenis Permohonan</div>

        <div style={styles.detailGroup}>
          <div style={styles.label}>Nama Jenis</div>
          <div style={styles.value}>{data.namaJenis}</div>
        </div>

        <div style={styles.detailGroup}>
          <div style={styles.label}>Keterangan</div>
          <div style={styles.value}>{data.keterangan}</div>
        </div>
      </div>
    </div>
  );
};

export default JenisPermohonanFormDetail;
