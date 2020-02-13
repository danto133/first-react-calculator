import React from 'react';
import './styles.css';

const Index = props => {
    const { input, formula, isShowHistory, onBackspace, onShowHistory } = props;
    return (
        <div className="display-toolbar">
            <form className="display">
                <textarea className="display-formula" value={formula.join('')} readOnly />
                <textarea className="display-input" value={input} readOnly />
            </form>
            <div className="toolbar">
                <div className="toolbar-item" id="view-history" onClick={onShowHistory}>{isShowHistory ? "View Keypad" : "View History"}</div>
                <span className="toolbar-item"  id="backspace" onClick={onBackspace}><i className="fas fa-backspace"></i></span>
            </div>
        </div>
    );
};

export default Index;