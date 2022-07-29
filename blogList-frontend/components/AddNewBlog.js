import React, { useState } from 'react';
import blogService from '../services/blogList';

const AddNewBlog = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);
  const toggleVisibility = () => setVisible(!visible);

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.post({ title, author, url });
      setTitle('');
      setAuthor('');
      setUrl('');
      toggleVisibility();
      props.refetch();
      props.setMessage({ status: true, content: `Added "${title}".` });
      setTimeout(() => props.setMessage({}), 3000);
    }
    catch (exception) {
      props.setMessage({ status: false, content: exception.response.data.error });
      setTimeout(() => props.setMessage({}), 3000);
    }
  };

  if (props.user !== null) {
    if (visible) {
      return (
        <div>
          <h3>Add a new blog:</h3>
          <form onSubmit={addBlog}>
            <p>
              <input
                value={title}
                onChange={handleTitleChange}
                placeholder='Title'
              />
            </p>
            <p>
              <input
                value={author}
                onChange={handleAuthorChange}
                placeholder='Author'
              />
            </p>
            <p>
              <input
                value={url}
                onChange={handleUrlChange}
                placeholder='URL'
              />
            </p>
            <button type='submit'>
              post
            </button>
            <button onClick={toggleVisibility}>
              cancel
            </button>
          </form>
          <br/>
        </div>
      );
    }
    else {
      return (
        <p>
          <button onClick={toggleVisibility}>
            add new blog
          </button>
        </p>
      );
    } 
  }
};

export default AddNewBlog;
