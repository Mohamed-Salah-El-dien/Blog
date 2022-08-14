import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';
import './ReactionButtons.css';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const handleClick = () => {
      dispatch(
        reactionAdded({
          postId: post.id,
          reaction: name,
        })
      );
    };
    return (
      <button
        key={name}
        type="button"
        className="reaction-btn"
        onClick={handleClick}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className="reactions-container">{reactionButtons}</div>;
};

export default ReactionButtons;
