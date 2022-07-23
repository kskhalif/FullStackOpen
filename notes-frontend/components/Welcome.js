import React, { useState } from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Welcome = (props) => {
  const [userType, setUserType] = useState('');

  if (props.user !== null) {
    return (
      <p>
        Welcome, {`${props.user.name || props.user.username} `}
        <button onClick={props.logout}>
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
          setErrorMessage={props.setErrorMessage}
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
          setErrorMessage={props.setErrorMessage}
        />
      </div>
    );
  }
};

export default Welcome;
