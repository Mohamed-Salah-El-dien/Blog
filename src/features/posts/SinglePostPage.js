import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { useParams, Link } from 'react-router-dom';
import './SinglePostPage.css';

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  return (
    <article className="single-card">
      <h2 className="post-title-s">{post.title}</h2>
      <p className="post-body-s">{post.body}</p>
      <p className="postCredit-s">
        <Link to={`/post/edit/${post.id}`}>Edit post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
