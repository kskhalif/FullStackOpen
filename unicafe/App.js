import React, { useState } from 'react';
import './App.css';

const getAverage = (good, bad, total) => {
  return (good * 1 + bad * -1) / total;
};

const getPositive = (good, total) => {
  return 100 * (good / total);
};

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const StatLine = (props) => {
  return (
    <div>
      <p>{props.text}: {props.value} {props.percentage ? '%' : ''}</p>
    </div>
  );
};

const Statistics = (props) => {
  if (!props.total) {
    return (
      <div>
        No feedback given.
      </div>
    );
  }
  else {
    return (
      <div>
        <StatLine text={'good'} value={props.good} percentage={false} />
        <StatLine text={'neutral'} value={props.neutral} percentage={false} />
        <StatLine text={'bad'} value={props.bad} percentage={false} />
        <StatLine text={'total'} value={props.total} percentage={false} />
        <StatLine text={'average'} value={getAverage(props.good, props.bad, props.total)} percentage={false} />
        <StatLine text={'positive'} value={getPositive(props.good, props.total)} percentage={true} />
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h2>Give Feedback:</h2>
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
