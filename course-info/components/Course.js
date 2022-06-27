import React from 'react';

const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
};

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.number}</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.id} name={part.name} number={part.ex} />
      )}
    </div>
  );
};

const Total = (props) => {
  const exercises = props.parts.map(part => part.ex);
  const numExercises = exercises.reduce((prev, next) => prev + next , 0);
  return (
    <div>
      <p>Number of exercises {numExercises}</p>
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
