import React from 'react';
import { useParams } from 'react-router-dom'; // Mengimpor useParams untuk mendapatkan parameter dari URL
import { useSellItem } from '../../components/context/SellItemContext'; // Mengimpor useSellItem

function BuyReceipt() {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const { sellItems } = useSellItem(); // Mengakses sellItems dari context
  const item = sellItems[id]; // Mengambil item berdasarkan id

  if (!item) {
    return <p>Produk tidak ditemukan.</p>;
  }

  const totalAmount = item.price + 100 + 3000; // Harga + biaya layanan + ongkos kirim

  return (
    <div className="receipt-container">
      <h2>Struk Pembelian</h2>
      <div className="receipt-detail">
        <img src={URL.createObjectURL(item.photo)} alt={item.category} />
        <div className="receipt-info">
          <h3>{item.category} ({item.weight} kg)</h3>
          <p>Rp{item.price}</p>
          <p>Biaya Layanan: Rp100</p>
          <p>Ongkos Kirim: Rp3.000</p>
        </div>
        <div className="total-amount">
          <p>Total Pembelian: Rp{totalAmount}</p>
          <p>No. Transaksi: 0123456789</p>
          <p>10 Desember 2024 24:24:24 WIB</p>
        </div>
      </div>
    </div>
  );
}

export default BuyReceipt;
