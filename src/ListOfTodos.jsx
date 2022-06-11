import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ListOfTodos.css';

function Header(props){
    return (
        <div className='header'>
            <div className='text-truncate header-title'>{props.title}</div>
        </div>
    );   
}

function TodoList(props){
    return (
        <div>
            { props.todos.map((todo, i) => <TodoItem key={i} {...todo} />) }
        </div>
    );
}

function TodoItem(props) {
    return (
        <div className='todo-item'>
        <TodoTextAndCheckbox todo={props.todo}/>
        <button className='edit-todo'><FontAwesomeIcon icon={faPenToSquare}/></button>
        </div>
    );
}

function TodoTextAndCheckbox(props){
    return (
        <label className='container'>{props.todo}
            <input type="checkbox"></input>
            <span className='checkmark'></span>
        </label>
    );
}

function TodoContainer(props) {
    return (
        <div className='todo-list-container'>
            <Header title={'Todo List'}/>
            <div className='widget-content'>
                <TodoList todos={props.todos}/>
            </div>
        </div>
    );
}

export {TodoContainer, Header};