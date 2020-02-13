import React, { useRef, useEffect } from 'react';
import './styles.css';

const Index = (props => {
    const { isShowHistory, history, onHandleHistoryItem, onEqual, onClearHistory } = props;
    const historyList = useRef('');

    const isOverflowX = (element) => {
        return element.scrollWidth > element.clientWidth;
    }
    const isOverflowY = (element) => {
        return element.scrollHeight > element.clientHeight;
    }
    const scrollBarHistory = (element) => {
        if(isOverflowX(element)) element.style.overflowX = 'scroll';
        else element.style.overflowX = 'hidden';
        if(isOverflowY(element)) element.style.overflowY = 'scroll'; 
        else element.style.overflowY = 'hidden';
    }
    useEffect(() => {
        scrollBarHistory(historyList.current);
    })
    return (
        <div className={`${isShowHistory ? '' : 'hidden'} history`}>
            <div className="history-list" ref={historyList}>
                {history.map((item,index) => {
                    return (
                        <div key={index} className="history-item">
                            <div className="history-item-formula">{item.formula.join('')}</div>
                            <div className="history-item-result" value={item.result} onClick={onHandleHistoryItem}>={item.result}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
            <div className="history-btn">
                <button id="clear-history" onClick={onClearHistory}>Clear</button>
                <button id="calculate" onClick={onEqual}>Equal</button>
            </div>
        </div>
    );
});

export default Index;