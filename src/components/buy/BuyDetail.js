import React from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useSellItem } from '../../components/context/SellItemContext'; // Akan digunakan nanti

function BuyDetail() {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { sellItems, addBuyItem } = useSellItem(); // addBuyItem akan digunakan nanti
  
  const item = sellItems[id];

  if (!item) {
    return <p>Produk tidak ditemukan.</p>;
  }

  const handlePurchase = () => {
    item.isPurchased = true;
    // Lanjutkan proses pembelian
  };

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
          <Link to={`/buy/payment/${id}`}>
            <button className="buy-btn" onClick={handlePurchase}>Beli</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyDetail;
