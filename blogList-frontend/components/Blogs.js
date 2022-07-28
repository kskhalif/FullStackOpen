import React from 'react';
import blogService from '../services/blogList';
import Blog from './Blog';

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
      <div>
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
      </div>
    );
  }
};

export default Blogs;
