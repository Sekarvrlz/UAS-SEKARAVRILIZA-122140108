import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext'; 
import { SellItemProvider } from './components/context/SellItemContext'; 

// Import komponen-komponen yang diperlukan
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import HomePage from './components/home/HomePage';
import Orders from './components/orders/Orders';
import OrderHistory from './components/history/OrderHistory';
import OrderDetail from './components/orders/OrdersDetail';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';  
import SellItem from './components/sell/SellItem';  
import BuyItem from './components/buy/BuyItem';
import Footer from './components/Footer';  
import Navbar from './components/Navbar'; // Import Navbar

import './components/styles/global.css';

import ProtectedRoute from './components/utils/ProtectedRoute';
import BuyDetail from './components/buy/BuyDetail';
import BuyReceipt from './components/buy/BuyReceipt';
import BuyPayment from './components/buy/BuyPayment';

// Import AdminDashboard
import AdminDashboard from './components/admin/AdminDashboard';

// Pastikan komponen-komponen `Details` dan `Receipt` diimpor dengan benar
import Details from './components/sell/Details'; 
import Receipt from './components/sell/Receipt';

function App() {
  console.log('Rendering App');
  return (
    <UserProvider> 
      <SellItemProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Halaman untuk user biasa */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Navbar /> {/* Navbar ditampilkan setelah login */} 
                <HomePage />
                <Footer />  
              </ProtectedRoute>
            } />
            <Route path="/sell" element={
              <ProtectedRoute>
                <Navbar />
                <SellItem />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/buy" element={
              <ProtectedRoute>
                <Navbar />
                <BuyItem />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/buy/detail/:id" element={
              <ProtectedRoute>
                <Navbar />
                <BuyDetail />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/buy/payment/:id" element={
              <ProtectedRoute>
                <Navbar />
                <BuyPayment/>
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/buy/receipt" element={
              <ProtectedRoute>
                <Navbar />
                <BuyReceipt/>
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/sell/details" element={
              <ProtectedRoute>
                <Navbar />
                <Details /> {/* Pastikan Details sudah diimpor */}
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/sell/receipt" element={
              <ProtectedRoute>
                <Navbar />
                <Receipt /> {/* Pastikan Receipt sudah diimpor */}
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Navbar />
                <Orders />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/order-history" element={
              <ProtectedRoute>
                <Navbar />
                <OrderHistory />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/order-detail" element={
              <ProtectedRoute>
                <Navbar />
                <OrderDetail />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
                <Footer />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <Navbar />
                <EditProfile />
                <Footer />
              </ProtectedRoute>
            } />

            {/* Halaman Admin */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <Navbar />
                <AdminDashboard />
                <Footer />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </SellItemProvider>
    </UserProvider> 
  );
}

export default App;
