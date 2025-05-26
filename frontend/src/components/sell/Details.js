import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellItem } from '../context/SellItemContext';

function Details() {
  const navigate = useNavigate();
  const { sellItems } = useSellItem();

  const latestItem = sellItems.length > 0 ? sellItems[sellItems.length - 1] : null;

  if (!latestItem) {
    return <p>Belum ada penjualan.</p>;
  }

  return (
    <div className="details-container">
      <h2>Detail Penjualan</h2>
      <div className="details-info">
        <p><strong>Kategori:</strong> {latestItem.category}</p>
        <p><strong>Deskripsi:</strong> {latestItem.description || '-'}</p>
        <p><strong>Alamat Penjual:</strong> {latestItem.address || '-'}</p>
        <p><strong>Berat Sampah:</strong> {latestItem.weight} kg</p>
        <p><strong>Harga:</strong> Rp{latestItem.price}</p>
      </div>
      <button onClick={() => navigate('/sell/receipt')}>Lihat Struk</button>
    </div>
  );
}

export default Details;
