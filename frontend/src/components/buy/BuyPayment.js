import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSellItem } from '../context/SellItemContext';
import axios from 'axios';

function BuyPayment() {
  const { id } = useParams();
  const { sellItems, addBuyItem } = useSellItem();
  const navigate = useNavigate();

  const item = sellItems.find(i => String(i.id) === id);

  const [buyerName, setBuyerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tunai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!item)
    return (
      <p style={{ textAlign: 'center', marginTop: 50, fontSize: 18 }}>
        Produk tidak ditemukan.
      </p>
    );

  const handlePayment = async () => {
    if (!buyerName.trim()) {
      setError('Nama pembeli wajib diisi');
      return;
    }
    const price = Number(item.price);
    const weight = Number(item.weight);
    if (isNaN(price) || price <= 0) {
      setError('Harga tidak valid');
      return;
    }
    if (isNaN(weight) || weight <= 0) {
      setError('Berat tidak valid');
      return;
    }
    if (!paymentMethod) {
      setError('Metode pembayaran wajib dipilih');
      return;
    }

    setLoading(true);
    setError(null);

    const buyData = {
      sell_item_id: item.id,
      buyer_name: buyerName.trim(),
      status: 'Diproses',
      payment_method: paymentMethod,
      price,
      weight,
    };

    try {
      const response = await axios.post('http://localhost:6543/api/buyitems', buyData);
      addBuyItem(response.data);
      alert('Pembayaran berhasil!');
      navigate('/buy/receipt');
    } catch (err) {
      setError('Gagal melakukan pembayaran: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '40px auto',
        padding: 30,
        borderRadius: 12,
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
      }}
    >
      <h2 style={{ marginBottom: 24, color: '#007bff', textAlign: 'center' }}>
        Pembayaran
      </h2>

      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: 20,
          borderRadius: 10,
          marginBottom: 30,
          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
        }}
      >
        <p>
          <strong>Kategori:</strong>{' '}
          <span style={{ color: '#007bff', fontWeight: '600' }}>{item.category}</span>
        </p>
        <p>
          <strong>Berat:</strong> {item.weight} kg
        </p>
        <p>
          <strong>Harga:</strong>{' '}
          <span style={{ color: '#28a745', fontWeight: '700' }}>
            Rp{item.price.toLocaleString()}
          </span>
        </p>
      </div>

      <label htmlFor="buyerName" style={{ fontWeight: '600' }}>
        Nama Pembeli:
      </label>
      <input
        id="buyerName"
        type="text"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
        placeholder="Masukkan nama pembeli"
        style={{
          width: '100%',
          padding: '10px 14px',
          marginTop: 6,
          marginBottom: 20,
          borderRadius: 8,
          border: error && !buyerName.trim() ? '2px solid #dc3545' : '1px solid #ccc',
          fontSize: 16,
          outline: 'none',
          transition: 'border-color 0.3s ease',
        }}
      />

      <label htmlFor="paymentMethod" style={{ fontWeight: '600' }}>
        Metode Pembayaran:
      </label>
      <select
        id="paymentMethod"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          marginTop: 6,
          marginBottom: 30,
          borderRadius: 8,
          border: '1px solid #ccc',
          fontSize: 16,
          outline: 'none',
        }}
      >
        <option value="Tunai">Tunai</option>
        <option value="Transfer">Transfer</option>
      </select>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px 0',
          backgroundColor: loading ? '#6c757d' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          fontSize: 18,
          fontWeight: '700',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: loading ? 'none' : '0 6px 14px rgba(0,123,255,0.4)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = '#0056b3';
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = '#007bff';
        }}
        type="button"
      >
        {loading ? 'Memproses...' : 'Bayar'}
      </button>

      {error && (
        <p
          style={{
            marginTop: 20,
            color: '#dc3545',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default BuyPayment;
