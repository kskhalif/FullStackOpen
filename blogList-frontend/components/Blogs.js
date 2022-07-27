import React, { useState } from 'react';
import blogService from '../services/blogList';

const Blog = (props) => {
  const [label, setLabel] = useState(props.initialLabel);

  const likeBlog = async () => {
    try {
      await blogService.like(props.blog._id.toString());
      if (label === 'like') setLabel('unlike');
      else setLabel('like');
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
  
  return (
    <li>
      <a href={props.blog.url} target='_blank'>
        {props.blog.title}
      </a>
      {' '}
      by {props.blog.author}, likes: {props.blog.likes.length}
      {' '}
      {likeButton} {removeButton}
    </li>
  );
};

const Blogs = (props) => {
  const removeBlog = async (blog) => {
    if (confirm(`Remove "${blog.title}"?`)) {
      try {
        await blogService.remove(blog._id.toString());
        props.refetch();
        props.setMessage({ status: true, content: `Removed "${blog.title}".` });
        setTimeout(() => props.setMessage({}), 3000);
      }
      catch (exception) {
        props.setMessage({ status: false, content: exception.response.data.error });
        setTimeout(() => props.setMessage({}), 3000);
      }
    }
  };

  if (props.user !== null) {
    return (
      <ul>
        {props.blogs.map(blog => {
          const canLike = props.user !== null;
          const canRemove = props.user !== null
            ? props.user.username === blog.user.username
            : false;
  
          const initialLabel = blog.likes.find(user => 
            user.username === props.user.username)
            ? 'unlike'
            : 'like';
  
          return (
            <Blog
              key={blog._id.toString()}
              blog={blog}
              canLike={canLike}
              canRemove={canRemove}
              initialLabel={initialLabel}
              removeBlog={() => removeBlog(blog)}
              refetch={props.refetch}
              setMessage={props.setMessage}
            />
          );
        })}
      </ul>
    );
  }
};

export default Blogs;
