import React, { createContext, useContext, useState } from 'react';

// Context untuk pengguna
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // State untuk menyimpan data pengguna
  const [user, setUser] = useState({
    fullName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    role: 'user',  // Default role adalah 'user', bisa diganti menjadi 'admin' setelah login
  });
  
  const [ecoPoints, setEcoPoints] = useState(0);  // Poin pengguna
  const [garbage, setGarbage] = useState([]); // Daftar sampah yang perlu dikelola
  
  const addEcoPoints = (points) => {
    setEcoPoints(prevPoints => prevPoints + points);  // Menambahkan poin
  };

  const login = (username, email, role = 'user') => {
    setUser({ fullName: username, email, role });
  };

  // Fungsi logout
  const logout = () => {
    setUser({
      fullName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      role: 'user',
    });
    setGarbage([]);
    setEcoPoints(0);
  };

  // Fungsi untuk admin mengedit atau menghapus sampah
  const handleDeleteGarbage = (garbageId) => {
    setGarbage(garbage.filter(item => item.id !== garbageId));
    // Mengurangi poin jika sampah dihapus
    setEcoPoints(ecoPoints - 10); // Contoh pengurangan poin
  };

  const handleEditGarbage = (garbageId, newData) => {
    setGarbage(garbage.map(item => item.id === garbageId ? { ...item, ...newData } : item));
  };

  // Fungsi untuk memperbarui data user
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  // Menambahkan status login (apakah pengguna sudah login atau belum)
  const isLoggedIn = user !== null;

  return (
    <UserContext.Provider value={{
      user,
      ecoPoints,
      garbage,
      isLoggedIn,
      addEcoPoints,
      login,
      logout,
      handleDeleteGarbage,
      handleEditGarbage,
      setEcoPoints,
      setGarbage,
      updateUser,  // Untuk memperbarui data user
      setUser,  // Menyediakan fungsi setUser untuk memperbarui data user
    }}>
      {children}
    </UserContext.Provider>
  );
};
