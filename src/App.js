import React, { useState, useReducer } from 'react';
import Display from './components/Display';
import Buttons from './components/Buttons';
import History from './components/History';
import CalculatorReducer, { initialState } from './redux/CalculatorReducer';
import { onShowHistory } from './redux/actions';
import { 
  isNotNumber, 
  isOperator, 
  evaluate,
  isNumber 
} from './helper';
import './App.css';

function App() {
  const [formula, setFormula] = useState([]),
  [input, setInput] = useState('0'),
  [history, setHistory] = useState([]),
  [afterCalculator, setAfterCalculator] = useState(false);

  const [state, dispatch] = useReducer(CalculatorReducer, initialState);
  
  const onDigit = ({target}) => {
    const digit = target.innerText;
    if(afterCalculator) {
      setInput(digit);
      setAfterCalculator(false);
    } else if(input === '0') {
      setInput(digit)
    } else if(isNotNumber(input)) {
      setInput(digit);
      setFormula(formula.concat(input));
    } else {
      setInput(input.concat(digit));
    };
  }

  const onDecimal = ({target}) => {
    const decimal = target.innerText;
    if(afterCalculator) {
      setInput(`0${decimal}`);
      setAfterCalculator(false);
    } else if(isNotNumber(input)) {
      setInput(`0${decimal}`);
      setFormula(formula.concat(input))
    } else if(!input.includes(decimal)) {
      setInput(input.concat(decimal));
    }
  }

  const onOperator = ({target}) => {
    const operator = target.innerText;
    if(isOperator(input)) {
      setInput(operator);
      setAfterCalculator(false);
    } else if(input !== '(') {
      setFormula(formula.concat(input));
      setInput(operator);
      setAfterCalculator(false);
    }
  }
  
  const onEqual = () => {
    const finalFormula = formula.concat(input);
    const result = evaluate(finalFormula)
    if(!Number.isNaN(result)) {
      const newHistory = {
        formula: finalFormula,
        result
      }
      setInput(result + '');
      setFormula([]);
      setHistory([].concat(newHistory, history));
      setAfterCalculator(true);
    }
  }

  const onParenthesis = ({target}) => {
    const parenthesis = target.innerText;
    if((parenthesis === '(')) {
      if( (isNumber(input) && input !== '0') || 
      (isNumber(input) && input === '0' && formula.length > 0) || 
      input === ')') {
        setInput(parenthesis);
        setFormula(formula.concat([input, 'x']));
        setAfterCalculator(false);
      } else if(isOperator(input) || input === '(') {
        setInput(parenthesis);
        setFormula(formula.concat(input));
        setAfterCalculator(false)
      } else if(isNumber(input) && input === '0' && formula.length === 0) {
        setInput(parenthesis);
        setAfterCalculator(false);
      }
    } else {
      const arrayOpenParenthesis = formula.join('').match(/\(/g);
      const numOpenPatenthesis = arrayOpenParenthesis ? arrayOpenParenthesis : 0;
      
      const arrayCloseParenthesis = formula.join('').match(/\)/g);
      const numCloseParenthesis = arrayCloseParenthesis ? arrayCloseParenthesis : 0;

      if(isNumber(input) || ( input === ')' && numOpenPatenthesis > 0 && numOpenPatenthesis > numCloseParenthesis )) {
        setInput(parenthesis);
        setFormula(formula.concat(input));
        setAfterCalculator(false);
      }
    }
  }
  
  const onClear = () => {
    setFormula([]);
    setInput('0');
    setAfterCalculator(false);
  }

  const onBackspace = () => {
    const currentInputLength = input.length;
    if(input === 'Infinity' || input === '-Infinity' || input === 'NaN') {
      setInput('0');
      setAfterCalculator(false)
    } else if(currentInputLength > 1) {
      setInput(input.slice(0, currentInputLength - 1));
      setAfterCalculator(false);
    } else if(input !== '0') {
      setInput('0');
      setAfterCalculator(false);
    } else if(formula.length > 0) {
      setInput(formula[formula.length - 1]);
      setFormula(formula.slice(0, formula.length - 1));
      setAfterCalculator(false);
    }
  } 

  const onHandleHistoryItem = ({target}) => {
    const number = target.getAttribute('value');
    if(isNumber(input)) {
      setInput(number);
    } else {
      setInput(number);
      setFormula(formula.concat(input));
    }
  }

  return (

    <div>
      <div className="calculator">
        <Display 
          input={input}
          formula={formula}
          isShowHistory={state.isShowHistory}
          onShowHistory={() => dispatch(onShowHistory())}
          onBackspace={onBackspace}
        />

        <Buttons 
          onDigit={onDigit}
          onDecimal={onDecimal}
          onOperator={onOperator}
          onEqual={onEqual}
          onParenthesis={onParenthesis}
          onClear={onClear}
        />

        <History 
          isShowHistory={state.isShowHistory}
          history={history}
          onHandleHistoryItem={onHandleHistoryItem}
          onEqual={onEqual}
          onClearHistory={() => setHistory([])}
        />
      </div>
    </div>
  );
}

export default App;
