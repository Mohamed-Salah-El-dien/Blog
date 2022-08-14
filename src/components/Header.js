import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount, getCount } from '../features/posts/postsSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <header className="Header">
      <h1 className="header-title">Redux Blog</h1>
      <nav className="header-nav">
        <ul className="header-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="user">Users</Link>
          </li>
        </ul>
        <button
          className="header-btn"
          onClick={() => dispatch(increaseCount())}
        >
          {count}
        </button>
      </nav>
    </header>
  );
};

export default Header;
