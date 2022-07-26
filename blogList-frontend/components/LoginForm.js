import React, { useState } from 'react';
import login from '../services/login';
import blogService from '../services/blogList';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await login({ username, password });
      localStorage.setItem('loggedBlogListUser', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      props.setUser(loggedUser);
      setUsername('');
      setPassword('');
      props.setMessage({ status: true, content: 'Successfully logged in.' });
      setTimeout(() => props.setMessage({}), 3000);
    }
    catch (exception) {
      props.setMessage({ status: false, content: exception.response.data.error });
      setTimeout(() => props.setMessage({}), 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username: {' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password: {' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
      <br/>
    </div>
  );
};

export default LoginForm;
