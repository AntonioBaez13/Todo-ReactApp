import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TodoContainer} from './ListOfTodos';
import AddTodo from './AddTodo';
import TopBar from './TopBar';
import TestersContainer from './ListOfTesters';

function App(props) {
    const [todo, setTodo] = useState([]);
    const addTodo = (x) => {
        setTodo([...todo, x]);
    };
    return (
        <div>
            <TopBar/>
            <div className='box'>
                <AddTodo addTodo={addTodo} todos={todo} />
            </div>
            <div className='main-content'>
                <TodoContainer todos={todo} />
                <TestersContainer />
            </div>
        </div>
    );
}

ReactDOM.render(

    <App />,
    document.getElementById('root')
);