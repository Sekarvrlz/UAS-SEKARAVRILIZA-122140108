import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSellItem } from '../../components/context/SellItemContext'; // Mengimpor useSellItem
import { useUser } from '../../components/context/UserContext'; // Mengimpor useUser

function BuyPayment() {
  const { id } = useParams(); // Mengambil ID produk dari URL
  const { sellItems, addBuyItem } = useSellItem(); // Mengakses sellItems dan addBuyItem dari context
  const { user } = useUser(); // Mengambil data pengguna dari UserContext
  const navigate = useNavigate();

  // Debugging: Cek ID yang diteruskan dari URL
  console.log("ID produk yang diteruskan:", id);

  const item = sellItems[parseInt(id, 10)]; // Ambil item berdasarkan ID

  // Debugging: Cek item yang diambil berdasarkan ID
  console.log("Item yang ditemukan:", item);

  const [paymentMethod, setPaymentMethod] = useState('Tunai');

  const handlePayment = () => {
    alert("Pembayaran Berhasil!");

    // Pastikan memanggil addBuyItem saat pembelian selesai
    const newItem = {
      category: item.category,
      price: item.price,
      weight: item.weight,
      status: 'Diproses', // Status awal pembelian
      type: 'buy', // Menandakan ini adalah pembelian
    };

    // Menambahkan item pembelian ke riwayat pembelian
    addBuyItem(newItem);

    navigate("/buy/receipt"); // Arahkan ke halaman struk setelah pembayaran berhasil
  };

  if (!item) {
    // Debugging: Cek jika item tidak ditemukan
    console.log("Produk tidak ditemukan dengan ID:", id);
    return <p>Produk tidak ditemukan.</p>; // Menampilkan pesan jika item tidak ditemukan
  }

  return (
    <div className="payment-container">
      <h2>Pembayaran</h2>
      <div className="product-info">
        <img
          src={item.photo ? URL.createObjectURL(item.photo) : 'default-image.jpg'}
          alt={item.category}
          style={{ width: '100px', height: '100px' }}
        />
        <div className="product-detail">
          <h3>{item.category} ({item.weight} kg)</h3>
          <p>Rp{item.price}</p>
          <p>Biaya Layanan: Rp100</p>
          <p>Ongkos Kirim: Rp3.000</p>
        </div>
      </div>

      <div className="payment-info">
        <h4>Informasi Pembeli</h4>
        <p>Nama Pembeli: {user.firstName} {user.lastName}</p> {/* Nama dari UserContext */}
        <p>No. Ponsel: {user.phoneNumber}</p> {/* Nomor telepon dari UserContext */}
        <p>Alamat: {user.address}</p> {/* Alamat dari UserContext */}
        
        <div className="payment-method">
          <label>Pilih Metode Pembayaran:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Tunai">Tunai</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>
      </div>

      <button onClick={handlePayment} className="pay-btn">Simpan</button>
    </div>
  );
}

export default BuyPayment;
