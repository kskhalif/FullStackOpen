import React, { useState } from 'react';

import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Welcome = (props) => {
  const [userType, setUserType] = useState('');

  const handleLogoutClick = () => {
    props.logout();
    setUserType('');
  };

  if (props.user !== null) {
    return (
      <p>
        Welcome, {`${props.user.name || props.user.username} `}
        <button onClick={handleLogoutClick}>
          logout
        </button>
      </p>
    );
  }
  else if (!userType) {
    return (
      <p>
        <button onClick={() => setUserType('new')}>
          new user
        </button>
        {' '}
        <button onClick={() => setUserType('existing')}>
          existing user
        </button>
      </p>
    );
  }
  else if (userType === 'new') {
    return (
      <div>
        <p>
          <button onClick={() => setUserType('')}>
            back
          </button>
        </p>
        <SignupForm
          setUser={props.setUser}
          setMessage={props.setMessage}
        />
      </div>
    );
  }
  else {
    return (
      <div>
        <p>
          <button onClick={() => setUserType('')}>
            back
          </button>
        </p>
        <LoginForm
          setUser={props.setUser}
          setMessage={props.setMessage}
        />
      </div>
    );
  }
};

export default Welcome;
