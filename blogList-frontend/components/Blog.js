import React, { useState } from 'react';
import blogService from '../services/blogList';

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [label, setLabel] = useState(props.initialLabel);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const likeBlog = async () => {
    try {
      await blogService.like(props.blog._id.toString());
      label === 'like' ? setLabel('unlike') : setLabel('like');
      props.refetch();
    }
    catch (exception) {
      props.setMessage({ status: false, content: exception.response.data.error });
      setTimeout(() => props.setMessage({}), 3000);
    }
  };

  const likeButton = props.canLike 
    ? <button onClick={likeBlog}>{label}</button>
    : null;
    
  const removeButton = props.canRemove
    ? <button onClick={props.removeBlog}>remove</button>
    : null;

  const details = () => visible
    ? (
      <div>
        <p>Author: {props.blog.author}</p>
        <p>Likes: {props.blog.likes.length} {likeButton}</p>
        <p>Posted by: {props.blog.user.name}</p>
        <p>{removeButton}</p>
      </div>
    )
    : null;
 
  return (
    <div style={blogStyle} className='blog'>
      <p>
        <a href={props.blog.url} target='_blank'>
          {props.blog.title}
        </a>
        {' '}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </p>
      {details()}
    </div>
  );
};

export default Blog;
