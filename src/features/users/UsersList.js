import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './usersSlice';
import { Link } from 'react-router-dom';
import './UsersList.css';

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li className="user" key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section className="users-container">
      <h2 className="users-title">Users</h2>
      <ul className="users">{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
