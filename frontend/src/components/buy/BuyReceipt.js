import React, { useEffect, useState } from 'react';
import { useSellItem } from '../context/SellItemContext';
import axios from 'axios';

function BuyReceipt() {
  const { buyHistory } = useSellItem();

  const [sellItems, setSellItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data sellItems dari API
  useEffect(() => {
    const fetchSellItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:6543/api/sellitems');
        setSellItems(response.data);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data barang');
      } finally {
        setLoading(false);
      }
    };

    fetchSellItems();
  }, []);

  if (!buyHistory || buyHistory.length === 0)
    return <p style={{ textAlign: 'center', marginTop: 50 }}>Belum ada pembelian.</p>;

  if (loading)
    return <p style={{ textAlign: 'center', marginTop: 50 }}>Memuat detail barang...</p>;

  if (error)
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>
        {error}
      </p>
    );

  // Pembelian terakhir
  const lastBuy = buyHistory[buyHistory.length - 1];

  // Cari detail barang di sellItems berdasar sell_item_id
  const itemDetail = sellItems.find((item) => item.id === lastBuy.sell_item_id);

  // Tarif layanan dan ongkir tetap
  const biayaLayanan = 100;
  const ongkir = 3000;

  // Harga dan berat dari data lengkap (utamakan itemDetail jika ada)
  const hargaBarang = itemDetail?.price ?? lastBuy.price ?? 0;
  const beratBarang = itemDetail?.weight ?? lastBuy.weight ?? 0;
  const kategoriBarang = itemDetail?.category ?? 'Unknown';

  // Total harga
  const totalHarga = hargaBarang + biayaLayanan + ongkir;

  // Nomor transaksi acak 9 digit (bisa diganti sistem no unik server nanti)
  const noTransaksi = lastBuy.id || Math.floor(100000000 + Math.random() * 900000000);

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '40px auto',
        padding: 30,
        borderRadius: 12,
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff' }}>
        STRUK PEMBELIAN
      </h2>
      <p
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 18,
          marginBottom: 30,
          color: '#555',
        }}
      >
        Toko Sampah Bersih
      </p>

      <div style={{ lineHeight: 1.6, fontSize: 16 }}>
        <p>
          <strong>ID Barang:</strong> {lastBuy.sell_item_id}
        </p>
        <p>
          <strong>Kategori:</strong> {kategoriBarang}
        </p>
        <p>
          <strong>Berat:</strong> {beratBarang} kg
        </p>
        <p>
          <strong>Harga:</strong> Rp{hargaBarang.toLocaleString()}
        </p>
        <p>
          <strong>Biaya Layanan:</strong> Rp{biayaLayanan.toLocaleString()}
        </p>
        <p>
          <strong>Ongkos Kirim:</strong> Rp{ongkir.toLocaleString()}
        </p>
        <hr style={{ margin: '20px 0' }} />
        <p style={{ fontWeight: '700', fontSize: 18 }}>
          Total: Rp{totalHarga.toLocaleString()}
        </p>
        <p>
          <strong>No. Transaksi:</strong> {noTransaksi}
        </p>
        <p>
          <strong>Tanggal:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>

      <div
        style={{
          marginTop: 30,
          textAlign: 'center',
          fontSize: 14,
          color: '#777',
        }}
      >
        <p>Terima kasih atas belanja Anda!</p>
        <p>Hubungi kami di: 123-456-7890</p>
      </div>
    </div>
  );
}

export default BuyReceipt;
