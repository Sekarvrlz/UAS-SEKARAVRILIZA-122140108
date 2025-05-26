import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSellItem } from '../context/SellItemContext';

function BuyItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { sellItems, setSellItems } = useSellItem();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:6543/api/sellitems');
        setSellItems(response.data);
      } catch (err) {
        setError('Gagal memuat data sampah yang dijual');
      } finally {
        setLoading(false);
      }
    };
    fetchSellItems();
  }, [setSellItems]);

  const handleBuy = (itemId) => {
    navigate(`/buy/payment/${itemId}`); // Arahkan ke halaman Payment
  };

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>
        Memuat data...
      </p>
    );

  if (error)
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: 50, fontSize: 18 }}>
        {error}
      </p>
    );

  if (!sellItems || sellItems.length === 0)
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: 50,
          fontSize: 18,
          fontStyle: 'italic',
          color: '#555',
        }}
      >
        Belum ada data sampah yang dijual.
      </p>
    );

  return (
    <div
      style={{
        maxWidth: 960,
        margin: '40px auto',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: 30,
          color: '#222',
          borderBottom: '3px solid #007bff',
          paddingBottom: 10,
          fontWeight: '700',
        }}
      >
        Daftar Sampah yang Dijual
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {sellItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 12,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div>
              <p style={{ fontWeight: '600', fontSize: 18, marginBottom: 10, color: '#007bff' }}>
                {item.category}
              </p>
              <p style={{ marginBottom: 6 }}>
                <strong>Berat:</strong> {item.weight} kg
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Harga:</strong>{' '}
                <span style={{ color: '#28a745', fontWeight: '700' }}>
                  Rp{item.price.toLocaleString()}
                </span>
              </p>
            </div>

            <button
              onClick={() => handleBuy(item.id)}
              style={{
                marginTop: 10,
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 0',
                fontWeight: '700',
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,123,255,0.3)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
              type="button"
            >
              Beli
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyItem;
