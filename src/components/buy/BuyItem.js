import React from 'react';
import { Link } from 'react-router-dom'; 
import { useSellItem } from '../../components/context/SellItemContext'; // Mengimpor useSellItem

function BuyItem() {
  const { sellItems } = useSellItem(); // Mengakses sellItems dari context

  return (
    <div className="buy-container">
      <h2>Buy Sampah</h2>
      <p>Temukan bahan daur ulang yang Anda butuhkan dan dukung keberlanjutan!</p>
      
      {/* Daftar produk */}
      <div className="product-list">
        {sellItems.map((item, index) => (
          <div className="product-item" key={index}>
            <img src={URL.createObjectURL(item.photo)} alt={item.category} />
            <div className="product-info">
              <h3>{item.category} ({item.weight} kg)</h3>
              <p>Rp{item.price}</p>
              <p>Alamat: Jl. Kapten Abdul Haq, Gg. Ibrahim Rajabasa, Bandar Lampung</p>
              
              {/* Tombol untuk menuju halaman detail produk */}
              <Link to={`/buy/detail/${index}`}>
                <button className="buy-btn">Buy Sampah</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyItem;
