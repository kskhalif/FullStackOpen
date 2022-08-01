import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';

import { legacy_createStore as createStore } from 'redux';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => {
  const currState = store.getState();
  console.log(currState);
});

const App = () => {
  return (
    <div>
      {store.getState()}
      <button onClick={() => store.dispatch({ type: 'INCREMENT'})}>
        plus
      </button>
      <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>
        reset
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(<App/>);
renderApp();
store.subscribe(renderApp);
