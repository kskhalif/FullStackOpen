import React from 'react';
import './App.css';

import Course from './components/Course'

const App = (props) => {
  return (
    <div>
      {props.courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  );
};

export default App;
