import React, { useState } from 'react';
import blogService from '../services/blogList';

const AddNewBlog = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.post({ title, author, url });
      setTitle('');
      setAuthor('');
      setUrl('');
      props.refetch();
      props.setMessage({ status: true, content: 'Added new blog.' });
      setTimeout(() => props.setMessage({}), 3000);
    }
    catch (exception) {
      props.setMessage({ status: false, content: exception.response.data.error });
      setTimeout(() => props.setMessage({}), 3000);
    }
  };

  if (props.user !== null) {
    return (
      <div>
        <h3>Add a new blog:</h3>
        <form onSubmit={addBlog}>
          <p>
            Title: {' '}
            <input
              value={title}
              onChange={handleTitleChange}
            />
          </p>
          <p>
            Author: {' '}
            <input
              value={author}
              onChange={handleAuthorChange}
            />
          </p>
          <p>
            URL: {' '}
            <input
              value={url}
              onChange={handleUrlChange}
            />
          </p>
          <button type='submit'>
            post
          </button>
        </form>
        <br/>
      </div>
    );
  }
};

export default AddNewBlog;
