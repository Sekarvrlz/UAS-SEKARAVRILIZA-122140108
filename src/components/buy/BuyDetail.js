import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Mengimpor useParams untuk mendapatkan parameter dari URL
import { useSellItem } from '../../components/context/SellItemContext'; // Mengimpor useSellItem

function BuyDetail() {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const { sellItems } = useSellItem(); // Mengakses sellItems dari context
  
  // Mengambil item berdasarkan id
  const item = sellItems[id];

  if (!item) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <div className="buy-detail-container">
      <h2>Detail Produk</h2>
      <div className="product-detail">
        <img src={URL.createObjectURL(item.photo)} alt={item.category} />
        <div className="product-info">
          <h3>{item.category} ({item.weight} kg)</h3>
          <p>Rp{item.price}</p>
          <p>Nama Penjual: Vay Yolla</p>
          <p>Alamat: Jl. Kapten Abdul Haq, Gg. Ibrahim Rajabasa, Bandar Lampung</p>
        </div>
        <div className="product-actions">
          {/* Tombol untuk menuju halaman pembayaran */}
          <Link to={`/buy/payment/${id}`}>
            <button className="buy-btn">Beli</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyDetail;
