import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import counterReducer from './reducers/counterReducer';

const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      <p>
        {store.getState().good} {''}
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      </p>
      <p>
        {store.getState().ok} {''}
        <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
      </p>
      <p>
        {store.getState().bad} {''}
        <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      </p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(<App/>);
renderApp();
store.subscribe(renderApp);
