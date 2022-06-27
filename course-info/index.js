import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          id: 1,
          name: 'Fundamentals of React', 
          ex: 10
        },
        {
          id: 2,
          name: 'Using props to pass data', 
          ex: 7
        },
        {
          id: 3,
          name: 'State of a component', 
          ex: 14
        },
        {
          id: 4,
          name: 'Redux',
          ex: 11
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          id: 1,
          name: 'Routing',
          ex: 3
        },
        {
          id: 2,
          name: 'Middlewares',
          ex: 7
        }
      ]
    }
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <App courses={courses} />
);
