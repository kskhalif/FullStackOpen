import React, { useState } from 'react';
import login from '../services/login';
import noteService from '../services/notes';

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
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(loggedUser));
      noteService.setToken(loggedUser.token);
      props.setUser(loggedUser);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      props.setErrorMessage(exception.response.data.error);
      setTimeout(() => props.setErrorMessage(null), 5000);
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
            id="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password: {' '}
          <input
            type="password"
            value={password}
            id="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
      <br/>
    </div>
  );
};

export default LoginForm;
