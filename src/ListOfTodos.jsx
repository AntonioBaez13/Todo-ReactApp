import React, { useState } from 'react';
import './ListOfTodos.css';

function ListOfTodos(props){
    return(
        <div className='todo-list-container'>
            <div className='header'>
                <div className='text-truncate header-title'></div>
            </div>
            <div className='widget-content'>
                <TodoList></TodoList>
            </div>
        </div>
    )
}

function TodoList(props) {
    return (
        <div className='todo-list-container'>
            <div className='header'>
                <div className='text-truncate header-title'>Todo List</div>
            </div>
            <div className='widget-content'>
            {props.todos.map((todo, i) => <TodoItem key={i} {...todo} />)}
        </div>
        </div>
    );
}

function TodoItem(props) {
    //TODO: Here I need to handle the "onClicked Checkbox" to "hide" the TodoItem
    return (
        <label className='container'>{props.todo}
            <input type="checkbox"></input>
            <span className='checkmark'></span>
        </label>
    );
}

export default TodoList;