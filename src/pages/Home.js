import React from 'react';
import UserList from '../components/UserList';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to User Management</h1>
      <UserList />
    </div>
  );
}

export default Home;