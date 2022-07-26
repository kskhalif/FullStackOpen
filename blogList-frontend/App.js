import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import './App.css';

import SECRET from './SECRET';
import blogService from './services/blogList';

import Notification from './components/Notification';
import Welcome from './components/Welcome';
import AddNewBlog from './components/AddNewBlog';
import Blogs from './components/Blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [flip, setFlip] = useState(false);
  const [message, setMessage] = useState({});
  const [user, setUser] = useState(null);

  const refetch = () => {
    setFlip(!flip)
  };
  
  const logout = () => {
    localStorage.removeItem('loggedBlogListUser');
    setUser(null);
    blogService.setToken(null);
  };
  
  useEffect(() => {
    (async () => {
      const data = await blogService.get();
      setBlogs(data);
    })();
  }, [flip]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogListUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      jwt.verify(loggedUser.token, SECRET, (error) => {
        if (error) {
          logout();
        }
        else {
          setUser(loggedUser);
          blogService.setToken(loggedUser.token);
        }
      });
    }
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={message} />
      <Welcome
        user={user}
        setUser={setUser}
        setMessage={setMessage}
        logout={logout}
      />
      <AddNewBlog
        user={user}
        refetch={refetch}
        setMessage={setMessage}
      />
      <Blogs
        user={user}
        blogs={blogs}
        refetch={refetch}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
