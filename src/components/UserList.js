import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:6543/get_users')
      .then(response => {
        console.log('Data fetched:', response.data); // Tambahkan log untuk memeriksa data
        setUsers(response.data.users || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="user-list">
      <h2>User List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user, index) => <li key={index}>{user}</li>)
          ) : (
            <li>No users found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserList;
