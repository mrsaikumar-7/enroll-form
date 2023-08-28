import React from 'react';
import '../usercard/UserCard.css'

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={`/uploads/${user.image}`} alt={user.fullname} />
      <h2>{user.fullname}</h2>
      <p><span>Email</span> : {user.email}</p>
      <p><span>Roll No</span> :{user.rollno}</p>
      <p><span>Year </span> : {user.year}</p>
      <p><span>Section</span> : {user.section}</p>
    </div>
  );
};

export default UserCard;
