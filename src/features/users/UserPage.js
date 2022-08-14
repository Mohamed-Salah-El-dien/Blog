import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';
import { Link, useParams } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map((post) => (
    <li className="title" key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section className="user-container">
      <h2 className="name">{user?.name}</h2>
      <ol className="titles">{postTitles}</ol>
    </section>
  );
};

export default UserPage;
