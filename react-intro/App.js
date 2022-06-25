import React from 'react';
import { useState } from 'react';
import './App.css';

const History = (props) => {
  if (!props.allClicks.length) {
    return (
      <div>
        The app is used by pressing the buttons.
      </div>
    );
  }
  else {
    return (
      <div>
        Button press history: {props.allClicks.join(' ')}
      </div>
    );
  }
};

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text={'left'} />
      <Button handleClick={handleRightClick} text={'right'} />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};


// const App = () => {
//   const [clicks, setClicks] = useState( { left: 0, right: 0 } );

//   const leftClick = () => {
//     setClicks({...clicks, left: ++clicks.left});
//   };
  
//   const rightClick = () => {
//     setClicks({...clicks, right: ++clicks.right});
//   };

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={leftClick}>
//         left
//       </button>
//       <button onClick={rightClick}>
//         right
//       </button>
//       {clicks.right}
//     </div>
//   );
// };


// const Display = (props) => {
//   return (
//     <div>{props.counter}</div>
//   );
// };

// const Button = (props) => {
//   return (
//     <button onClick={props.onClick}>
//       {props.text}
//     </button>
//   );
// };

// const App = () => {
//   const [ counter, setCounter ] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const setToZero = () => setCounter(0);

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text={'plus'} /> 
//       <Button onClick={decreaseByOne} text={'minus'} />
//       <Button onClick={setToZero} text={'reset'} />
//     </div>
//   );
// };


// const App = () => {
//   const [ counter, setCounter ] = useState(0);

//   setTimeout(
//     () => setCounter(counter + 1), 
//     1000
//   );

//   console.log('rendering...', counter);

//   return (
//     <div>{counter}</div>
//   );
// };


// const Hello = ({name, age}) => {
//   const bornYear = new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p> So you were probably born in {bornYear}</p>
//     </div>
//   );
// };

// const App = () => {
//   const name = "Peter";
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   );
// };

export default App;
