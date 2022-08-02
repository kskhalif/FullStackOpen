import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
renderApp();
store.subscribe(renderApp);
