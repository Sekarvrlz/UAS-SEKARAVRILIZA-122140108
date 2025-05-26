import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext'; 
import { SellItemProvider } from './components/context/SellItemContext'; 

// Import komponen
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import HomePage from './components/home/HomePage';
import OrderHistory from './components/history/OrderHistory';
import EditProfile from './components/profile/EditProfile';  
import Profile from './components/profile/Profile';
import SellItem from './components/sell/SellItem';  
import BuyItem from './components/buy/BuyItem';
import Footer from './components/Footer';  
import Navbar from './components/Navbar'; 
import './components/styles/global.css';
import ProtectedRoute from './components/utils/ProtectedRoute';
import BuyDetail from './components/buy/BuyDetail';
import BuyReceipt from './components/buy/BuyReceipt';
import BuyPayment from './components/buy/BuyPayment';
import AdminDashboard from './components/admin/AdminDashboard';
import Details from './components/sell/Details'; 
import Receipt from './components/sell/Receipt';

function App() {
  return (
    <UserProvider> 
      <SellItemProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Halaman user biasa */}
            <Route path="/home" element={
              <ProtectedRoute>
                <>
                  <Navbar /> 
                  <HomePage />
                  <Footer />  
                </>
              </ProtectedRoute>
            } />
            <Route path="/sell" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <SellItem />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/buy" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BuyItem />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/buy/detail/:id" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BuyDetail />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/buy/payment/:id" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BuyPayment/>
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/buy/receipt" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <BuyReceipt/>
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/sell/details" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Details />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/sell/receipt" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Receipt />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/order-history" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <OrderHistory />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Profile />
                  <Footer />
                </>
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EditProfile />
                  <Footer />
                </>
              </ProtectedRoute>
            } />

            {/* Halaman Admin */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <>
                    <Navbar />
                    <AdminDashboard />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </SellItemProvider>
    </UserProvider> 
  );
}

export default App;
