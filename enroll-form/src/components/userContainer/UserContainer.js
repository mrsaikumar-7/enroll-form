import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../usercard/UserCard';

const UserContainer = ({ updateTrigger }) => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Fetch user data from the server whenever updateTrigger changes
      axios.get('/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }, [updateTrigger]);
  
  return (
    <div className="user-container">
      <h1>User List</h1>
      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserContainer;
