import React, { useState } from 'react';
import './Calculator.css'; // Include a CSS file for styling

const Calculator = () => {
  const [display, setDisplay] = useState('');

  const handleButtonClick = (value) => {
    setDisplay((prev) => prev + value);
  };

  const handleClear = () => setDisplay('');
  const handleEvaluate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={display} readOnly className="display" />
      <div className="buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '.'].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn.toString())}>{btn}</button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleEvaluate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
