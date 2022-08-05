import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TodoContainer} from './ListOfTodos';
import TopBar from './TopBar';
import TestersContainer from './ListOfTesters';

function App(props) {
    return (
        <div>
            <TopBar/>
            <div className='box'>
            </div>
            <div className='main-content'>
                <TodoContainer />
                <TestersContainer />
            </div>
        </div>
    );
}

ReactDOM.render(

    <App />,
    document.getElementById('root')
);