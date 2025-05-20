import React, { createContext, useContext, useState } from 'react';

// Context untuk penjualan
const SellItemContext = createContext();

export function SellItemProvider({ children }) {
  const [sellItems, setSellItems] = useState([]);
  const [sellHistory, setSellHistory] = useState([]);
  const [buyHistory, setBuyHistory] = useState([]);

  // Menambahkan item penjualan
  const addSellItem = (item) => {
    const newItem = { ...item, type: 'sell', id: new Date().getTime() }; // Add unique id
    setSellItems((prevItems) => [...prevItems, newItem]);
    setSellHistory((prevHistory) => [...prevHistory, newItem]);
  };

  // Menambahkan item pembelian
  const addBuyItem = (item) => {
    const newItem = { ...item, type: 'buy', id: new Date().getTime() }; // Add unique id
    setBuyHistory((prevHistory) => [...prevHistory, newItem]);
  };

  // Memperbarui status transaksi penjualan
  const updateSellHistory = (updatedHistory) => {
    setSellHistory(updatedHistory);
  };

  // Memperbarui status transaksi pembelian
  const updateBuyHistory = (updatedHistory) => {
    setBuyHistory(updatedHistory);
  };

  return (
    <SellItemContext.Provider value={{
      sellItems,
      sellHistory,
      buyHistory,
      addSellItem,
      addBuyItem,
      updateSellHistory,
      updateBuyHistory
    }}>
      {children}
    </SellItemContext.Provider>
  );
}

export const useSellItem = () => useContext(SellItemContext);
