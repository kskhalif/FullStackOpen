import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const phonebook = new Map([
  ["Arto Hellas", "040-123456"],
  ["Ada Lovelace", "39-44-5323523"],
  ["Dan Abramov", "12-43-234345"],
  ["Mary Poppendieck", "39-23-6423122"]
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <App phonebook={phonebook} />
);
