import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const handleButtonClick = (value) => {
    if (typeof value === 'number' || value === '.') {
      if (waitingForSecondOperand) {
        setDisplay(value.toString());
        setWaitingForSecondOperand(false);
      } else {
        setDisplay(display === '0' ? value.toString() : display + value.toString());
      }
    } else if (value === 'AC') {
      resetCalculator();
    } else {
      handleOperator(value);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else {
      const result = performCalculation[operator](firstOperand, inputValue);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const resetCalculator = () => {
    setDisplay('0');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
  };

  return (
    <div className="calculator card">
      <input type="text" className="calculator-screen z-depth-1" value={display} readOnly />
      <div className="calculator-keys">
        {['+', '-', '*', '/'].map(op => (
          <button key={op} type="button" className="operator btn btn-info" onClick={() => handleButtonClick(op)}>{op}</button>
        ))}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(num => (
          <button key={num} type="button" className="btn btn-light waves-effect" onClick={() => handleButtonClick(num)}>{num}</button>
        ))}
        <button type="button" className="decimal function btn btn-secondary" onClick={() => handleButtonClick('.')}>.</button>
        <button type="button" className="all-clear function btn btn-danger btn-sm" onClick={() => handleButtonClick('AC')}>AC</button>
        <button type="button" className="equal-sign operator btn btn-default" onClick={() => handleButtonClick('=')}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
