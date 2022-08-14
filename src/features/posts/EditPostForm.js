import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, selectPostById, updatePost } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';
import './EditPostForm.css';

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('failed to save the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option className="option" value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending');
      dispatch(
        deletePost({
          id: post.id,
        })
      ).unwrap();
      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (err) {
      console.log('failed to delete the post', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <section className="form-container">
      <div className="div-container">
        <h2 className="edit">Edit Post</h2>
        <form className="form">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          {/* ////////////////////////////////////////////// */}
          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
            <option className="option" value=""></option>
            {usersOptions}
          </select>
          {/* ////////////////////////////////////////////// */}
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          {/* ////////////////////////////////////////////// */}
          <button
            className="save-btn"
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>
          <button
            className="delete-btn"
            type="button"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPostForm;
