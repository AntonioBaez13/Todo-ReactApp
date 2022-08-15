import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TodoContainer} from './ListOfTodos';
import TopBar from './TopBar';
import TestersContainer from './ListOfTesters';
import { Metrics } from './Metrics';

function App(props) {
    return (
        <div>
            <TopBar/>
            <div className='box'>
                <Metrics/>
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