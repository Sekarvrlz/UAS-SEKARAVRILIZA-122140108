// SellItemContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SellItemContext = createContext();

export function SellItemProvider({ children }) {
  const [sellItems, setSellItems] = useState([]);
  const [sellHistory, setSellHistory] = useState([]);
  const [buyHistory, setBuyHistory] = useState([]);

  // Load data sellItems dari API saat component mount
  useEffect(() => {
    async function fetchSellItems() {
      try {
        const response = await axios.get('http://localhost:6543/api/sellitems');
        setSellItems(response.data);
      } catch (error) {
        console.error('Gagal memuat sellItems:', error);
      }
    }
    fetchSellItems();
  }, []);

  const addSellItem = (item) => {
    const newItem = { ...item, type: 'sell', id: new Date().getTime() };
    setSellItems(prev => [...prev, newItem]);
    setSellHistory(prev => [...prev, newItem]);
  };

  const addBuyItem = (item) => {
    const newItem = { ...item, type: 'buy', id: new Date().getTime() };
    setBuyHistory(prev => [...prev, newItem]);
  };

  return (
    <SellItemContext.Provider value={{
      sellItems,
      sellHistory,
      buyHistory,
      addSellItem,
      addBuyItem,
      setSellItems
    }}>
      {children}
    </SellItemContext.Provider>
  );
}

export const useSellItem = () => useContext(SellItemContext);
