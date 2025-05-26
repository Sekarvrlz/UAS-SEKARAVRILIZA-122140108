import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [sellHistory, setSellHistory] = useState([]);
  const [buyHistory, setBuyHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [sellPage, setSellPage] = useState(1);
  const [buyPage, setBuyPage] = useState(1);
  const itemsPerPage = 6; // sesuaikan berapa item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellRes, buyRes] = await Promise.all([
          axios.get('http://localhost:6543/api/sellitems'),
          axios.get('http://localhost:6543/api/buyitems'),
        ]);
        setSellHistory(sellRes.data);
        setBuyHistory(buyRes.data);
      } catch (err) {
        setError('Gagal memuat riwayat transaksi');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination helpers
  const sellTotalPages = Math.ceil(sellHistory.length / itemsPerPage);
  const buyTotalPages = Math.ceil(buyHistory.length / itemsPerPage);

  const sellCurrentItems = sellHistory.slice(
    (sellPage - 1) * itemsPerPage,
    sellPage * itemsPerPage
  );
  const buyCurrentItems = buyHistory.slice(
    (buyPage - 1) * itemsPerPage,
    buyPage * itemsPerPage
  );

  // Handlers sama seperti sebelumnya...

  const handleDeleteSellItem = async (id) => {
    if (!window.confirm('Yakin hapus item jual ini?')) return;
    try {
      await axios.delete(`http://localhost:6543/api/sellitems/${id}`);
      setSellHistory((prev) => prev.filter((item) => item.id !== id));
      alert('Item jual berhasil dihapus');
    } catch (error) {
      alert('Gagal hapus item: ' + error.message);
    }
  };

  const handleChangeBuyStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:6543/api/buyitems/${id}`, { status });
      setBuyHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      alert('Status pembelian diperbarui');
    } catch (error) {
      alert('Gagal update status: ' + error.message);
    }
  };

  const handleChangeSellStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:6543/api/sellitems/${id}/status`, { status });
      setSellHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      alert('Status penjualan diperbarui');
    } catch (error) {
      alert('Gagal update status penjualan: ' + error.message);
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }}>
        Memuat data...
      </p>
    );
  if (error)
    return (
      <p
        style={{
          color: 'red',
          textAlign: 'center',
          marginTop: 50,
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        {error}
      </p>
    );

  // Tombol styling compact modern
  const buttonStyle = {
    marginRight: 8,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '6px 14px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: 13,
    transition: 'background-color 0.3s ease',
  };

  const buttonDangerStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    marginRight: 0,
  };

  const buttonSuccessStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
  };

  const handleMouseEnter = (e, color) => {
    e.currentTarget.style.backgroundColor = color;
  };
  const handleMouseLeave = (e, color) => {
    e.currentTarget.style.backgroundColor = color;
  };

  // Pagination button styling
  const paginationBtnStyle = (disabled) => ({
    backgroundColor: disabled ? '#ccc' : '#007bff',
    color: disabled ? '#666' : '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '6px 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '600',
    fontSize: 14,
    margin: '0 6px',
  });

  return (
    <div
      style={{
        maxWidth: 980,
        margin: '40px auto',
        padding: '30px 25px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 16,
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.12)',
        minHeight: '80vh',
        userSelect: 'none',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: 45,
          fontWeight: '700',
          fontSize: 32,
          color: '#27ae60',
          letterSpacing: 1.1,
        }}
      >
        Dashboard Admin - Kelola Transaksi
      </h1>

      {/* Riwayat Penjualan */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            marginBottom: 24,
            borderBottom: '3px solid #007bff',
            paddingBottom: 8,
            fontWeight: '700',
            fontSize: 24,
            color: '#007bff',
          }}
        >
          Riwayat Penjualan
        </h2>
        {sellHistory.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#555' }}>Belum ada penjualan.</p>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              {sellCurrentItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div>
                    <p style={{ fontSize: 16, fontWeight: '700', marginBottom: 6, color: '#333' }}>
                      {item.category}
                    </p>
                    <p style={{ marginBottom: 8 }}>
                      Harga: <strong>Rp{item.price.toLocaleString()}</strong>
                    </p>
                    <p style={{ marginBottom: 8 }}>Berat: {item.weight} kg</p>
                    <p
                      style={{
                        color:
                          item.status === 'Selesai'
                            ? '#28a745'
                            : item.status === 'Diproses'
                            ? '#ffc107'
                            : '#6c757d',
                        fontWeight: '600',
                        fontSize: 14,
                      }}
                    >
                      Status: {item.status || 'Pending'}
                    </p>
                  </div>

                  {/* Tombol update status penjualan */}
                  <div style={{ marginTop: 'auto', marginBottom: 12 }}>
                    <button
                      onClick={() => handleChangeSellStatus(item.id, 'Diproses')}
                      style={buttonStyle}
                      onMouseEnter={(e) => handleMouseEnter(e, '#0056b3')}
                      onMouseLeave={(e) => handleMouseLeave(e, '#007bff')}
                      type="button"
                    >
                      Diproses
                    </button>
                    <button
                      onClick={() => handleChangeSellStatus(item.id, 'Selesai')}
                      style={buttonSuccessStyle}
                      onMouseEnter={(e) => handleMouseEnter(e, '#1e7e34')}
                      onMouseLeave={(e) => handleMouseLeave(e, '#28a745')}
                      type="button"
                    >
                      Selesai
                    </button>
                  </div>

                  {/* Tombol hapus */}
                  <button
                    onClick={() => handleDeleteSellItem(item.id)}
                    style={buttonDangerStyle}
                    onMouseEnter={(e) => handleMouseEnter(e, '#c82333')}
                    onMouseLeave={(e) => handleMouseLeave(e, '#dc3545')}
                    type="button"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Sell */}
            <div style={{ textAlign: 'center', marginTop: 25 }}>
              <button
                onClick={() => setSellPage((p) => Math.max(1, p - 1))}
                disabled={sellPage === 1}
                style={paginationBtnStyle(sellPage === 1)}
              >
                Previous
              </button>
              <span style={{ margin: '0 15px', fontWeight: '600' }}>
                Halaman {sellPage} dari {sellTotalPages}
              </span>
              <button
                onClick={() => setSellPage((p) => Math.min(sellTotalPages, p + 1))}
                disabled={sellPage === sellTotalPages}
                style={paginationBtnStyle(sellPage === sellTotalPages)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* Riwayat Pembelian */}
      <section>
        <h2
          style={{
            marginBottom: 24,
            borderBottom: '3px solid #28a745',
            paddingBottom: 8,
            fontWeight: '700',
            fontSize: 24,
            color: '#28a745',
          }}
        >
          Riwayat Pembelian
        </h2>
        {buyHistory.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#555' }}>Belum ada pembelian.</p>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              {buyCurrentItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    userSelect: 'none',
                  }}
                >
                  <p style={{ marginBottom: 10, fontWeight: '700', fontSize: 16, color: '#333' }}>
                    <span>ID Barang:</span> {item.sell_item_id} <br />
                    <span>Pembeli:</span> {item.buyer_name}
                  </p>
                  <p
                    style={{
                      marginBottom: 20,
                      fontWeight: '700',
                      color:
                        item.status === 'Selesai'
                          ? '#28a745'
                          : item.status === 'Diproses'
                          ? '#ffc107'
                          : '#6c757d',
                      fontSize: 14,
                    }}
                  >
                    Status: {item.status}
                  </p>

                  <div style={{ marginTop: 'auto' }}>
                    <button
                      onClick={() => handleChangeBuyStatus(item.id, 'Diproses')}
                      style={buttonStyle}
                      onMouseEnter={(e) => handleMouseEnter(e, '#0056b3')}
                      onMouseLeave={(e) => handleMouseLeave(e, '#007bff')}
                      type="button"
                    >
                      Diproses
                    </button>
                    <button
                      onClick={() => handleChangeBuyStatus(item.id, 'Selesai')}
                      style={buttonSuccessStyle}
                      onMouseEnter={(e) => handleMouseEnter(e, '#1e7e34')}
                      onMouseLeave={(e) => handleMouseLeave(e, '#28a745')}
                      type="button"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buy */}
            <div style={{ textAlign: 'center', marginTop: 25 }}>
              <button
                onClick={() => setBuyPage((p) => Math.max(1, p - 1))}
                disabled={buyPage === 1}
                style={paginationBtnStyle(buyPage === 1)}
              >
                Previous
              </button>
              <span style={{ margin: '0 15px', fontWeight: '600' }}>
                Halaman {buyPage} dari {buyTotalPages}
              </span>
              <button
                onClick={() => setBuyPage((p) => Math.min(buyTotalPages, p + 1))}
                disabled={buyPage === buyTotalPages}
                style={paginationBtnStyle(buyPage === buyTotalPages)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
