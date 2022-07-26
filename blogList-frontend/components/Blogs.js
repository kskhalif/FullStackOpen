import React from 'react';
import blogService from '../services/blogList';

const Blog = (props) => {
  if (props.canRemove) {
    return (
      <li>
        <a href={props.blog.url} target='_blank'>
          {props.blog.title}
        </a>
        {' '}
        by {props.blog.author}, likes: {props.blog.likes}
        {' '}
        <button onClick={props.like}>like</button>
        <button onClick={props.remove}>remove</button>
      </li>
    );
  }
  else if (props.canLike) {
    return (
      <li>
        <a href={props.blog.url} target='_blank'>
          {props.blog.title}
        </a>
        {' '}
        by {props.blog.author}, likes: {props.blog.likes}
        {' '}
        <button onClick={props.like}>like</button>
      </li>
    );
  }
  else {
    return (
      <li>
        <a href={props.blog.url} target='_blank'>
          {props.blog.title}
        </a>
        {' '}
        by {props.blog.author}, likes: {props.blog.likes}
      </li>
    );
  }
};

const Blogs = (props) => {
  const likeBlog = async (blog) => {
    try {
      await blogService.like(blog._id.toString());
      props.refetch();
    }
    catch (exception) {
      props.setMessage({ status: false, content: exception.response.data.error });
      setTimeout(() => props.setMessage({}), 3000);
    }
  };

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

  return (
    <ul>
      {props.blogs.map(blog => {
        const canLike = props.user !== null;
        const canRemove = props.user !== null
          ? props.user.username === blog.user.username
          : false;
        return (
          <Blog
            key={blog._id.toString()}
            blog={blog}
            canLike={canLike}
            canRemove={canRemove}
            like={() => likeBlog(blog)}
            remove={() => removeBlog(blog)}
          />
        );
      })}
    </ul>
  );
};

export default Blogs;
