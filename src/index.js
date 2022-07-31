import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TodoContainer} from './ListOfTodos';
import AddTodo from './AddTodo';
import TopBar from './TopBar';
import TestersContainer from './ListOfTesters';
import axios from 'axios';

function App(props) {
    const [isLoading, setLoading] = useState(true);
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5000/api/Todo/getactivetodos').then(response => {
            setTodo(response.data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return (null);
    }

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