import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SellHistory() {
  const [sellHistory, setSellHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSellHistory = async () => {
      try {
        const response = await axios.get('http://localhost:6543/api/sellitems');
        setSellHistory(response.data);
      } catch {
        setError('Gagal memuat riwayat penjualan');
      } finally {
        setLoading(false);
      }
    };
    fetchSellHistory();
  }, []);

  const totalPages = Math.ceil(sellHistory.length / itemsPerPage);
  const currentItems = sellHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Memuat riwayat penjualan...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (sellHistory.length === 0) return <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Belum ada penjualan.</p>;

  return (
    <section style={{ marginBottom: 50 }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentItems.map(({ id, category, price, status, weight }) => (
          <li
            key={id}
            style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: 15,
              padding: 20,
              transition: 'transform 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <p><strong>Kategori:</strong> {category}</p>
            <p><strong>Harga:</strong> Rp{price.toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span style={{ color: status === 'Selesai' || !status ? '#28a745' : '#ffc107' }}>
                {status || 'Selesai'}
              </span>
            </p>
            <p><strong>Berat:</strong> {weight} kg</p>
            <p><strong>Jenis Transaksi:</strong> Penjualan</p>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={paginationButtonStyle(currentPage === 1)}
        >
          Previous
        </button>
        <span style={{ margin: '0 12px' }}>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle(currentPage === totalPages)}
        >
          Next
        </button>
      </div>
    </section>
  );
}

const paginationButtonStyle = (disabled) => ({
  backgroundColor: disabled ? '#ccc' : '#007bff',
  color: disabled ? '#666' : '#fff',
  border: 'none',
  borderRadius: 5,
  padding: '8px 16px',
  margin: '0 5px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.3s ease',
});

export default SellHistory;
