import React from 'react';

const Login = (props) => {
  if (props.user === null) {
    return (
      <div>
        <form onSubmit={props.handleLogin}>
          <div>
            Username: {' '}
            <input
              type="text"
              value={props.username}
              name="Username"
              onChange={props.handleUsernameChange}
            />
          </div>
          <div>
            Password: {' '}
            <input
              type="password"
              value={props.password}
              name="Password"
              onChange={props.handlePasswordChange}
            />
          </div>
          <button type='submit'>
            login
          </button>
        </form>
        <br/>
      </div>
    );
  }
  else {
    return (
      <p>
        Welcome, {`${props.user.name} `}
        <button onClick={props.logout}>
          logout
        </button>
      </p>
    );
  }
};

export default Login;
