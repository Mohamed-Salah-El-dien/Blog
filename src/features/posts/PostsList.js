import React from 'react';
import { useSelector } from 'react-redux';
import { getPostsError, getPostsStatus, selectPostIds } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import './PostsList.css';
const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postStatus === 'loading') {
    content = <p>"loading..."</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }
  return <section className="posts-list">{content}</section>;
};

export default PostsList;
