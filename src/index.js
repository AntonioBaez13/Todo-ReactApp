import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './ListOfTodos';
import AddTodo from './AddTodo';


function App(props) {
    const [todo, setTodo] = useState([]);
    const addTodo = (x) => {
        setTodo([...todo, x]);
    };
    return (
        <div>
            <div className='box'><AddTodo addTodo={addTodo} todos={todo} /></div>
            <TodoList todos={todo} />
        </div>
    );
}

ReactDOM.render(

    <App />,
    document.getElementById('root')
);