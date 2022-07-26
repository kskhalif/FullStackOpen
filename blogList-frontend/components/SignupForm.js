import React, { useState } from 'react';
import signup from '../services/signup';
import login from '../services/login';
import blogService from '../services/blogList';

const SignupForm = (props) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signup({ username, name, password });
      const loggedUser = await login({ username, password });
      localStorage.setItem('loggedBlogListUser', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      props.setUser(loggedUser);
      setUsername('');
      setName('');
      setPassword('');
      props.setMessage({ status: true, content: 'Created new account.' });
      setTimeout(() => props.setMessage({}), 3000);
    }
    catch (exception) {
      props.setMessage({ status: false, content: exception.response.data.error });
      setTimeout(() => props.setMessage({}), 3000);
    }
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
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
          Full Name: {' '}
          <input
            type="text"
            value={name}
            name="Name"
            onChange={handleNameChange}
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
            create
          </button>
      </form>
      <br/>
    </div>
  );
};

export default SignupForm;
