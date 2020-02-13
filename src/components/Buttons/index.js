import React from 'react';
import './styles.css';

const Index = (props => {
    const { onDigit, onDecimal, onOperator, onEqual, onParenthesis, onClear } = props;
    return (
        <div className="buttons">
            <button id="clear" onClick={onClear}>AC</button>
            <button id="parenthesis-open" onClick={onParenthesis}>(</button>
            <button id="parenthesis-close" onClick={onParenthesis}>)</button>
            <button id="divide" onClick={onOperator}>/</button>

            <button id="seven" onClick={onDigit}>7</button>
            <button id="eight" onClick={onDigit}>8</button>
            <button id="nine" onClick={onDigit}>9</button>
            <button id="multiply" onClick={onOperator}>x</button>

            <button id="four" onClick={onDigit}>4</button>
            <button id="five" onClick={onDigit}>5</button>
            <button id="six" onClick={onDigit}>6</button>
            <button id="subtract" onClick={onOperator}>-</button>

            <button id="one" onClick={onDigit}>1</button>
            <button id="two" onClick={onDigit}>2</button>
            <button id="three" onClick={onDigit}>3</button>
            <button id="add" onClick={onOperator}>+</button>

            <button id="zero" onClick={onDigit}>0</button>
            <button id="decimal" onClick={onDecimal}>.</button>
            <button id="equals" onClick={onEqual}>=</button>

        </div>
    );
});

export default Index;