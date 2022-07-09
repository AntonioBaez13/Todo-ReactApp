import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ListOfTodos.css';
import Modal from './EditTodoModal'
import { TodoItemViewModel } from './Commands';

//const axios = require('axios').default;

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
            { props.todos.map(todo => <TodoItem key={todo.id} {...todo} />) }
        </div>
    );
}

function TodoItem(props) {
    const todo = new TodoItemViewModel(props);
    const[isOpen, setIsOpen] = useState(false);
    const[todoItem, setTodoItem] = useState(todo);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className='todo-item'>
            <TodoTextAndCheckbox todo={todoItem.task}/>
            <button className='edit-todo' onClick={openModal}><FontAwesomeIcon icon={faPenToSquare}/></button>
            <Modal close={closeModal} show={isOpen} modalContent={todoItem} updateModalContent={setTodoItem}></Modal>
        </div>
    );
}

function TodoTextAndCheckbox(props){
    //Todo, edit the span 'checkmark' so that it can also handle the InProgress status 
    //have 3 class names (New, In Progress, Completed) 
    //and switch between classNames, based on value
    return (
        <label className='container'>{props.todo}
            <input type="checkbox"></input>
            <span className='checkmark'></span>
        </label>
    );
}

function TodoContainer(props) {
    //I need to perform some kind of OnMount,
    //so that when mounting i can get all the items that are on the 
    //database for today

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