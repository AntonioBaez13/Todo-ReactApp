import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ListOfTodos.css';
import Modal from './EditTodoModal'

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
    const[isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className='todo-item'>
        <TodoTextAndCheckbox todo={props.todo}/>
        <button className='edit-todo' onClick={openModal}><FontAwesomeIcon icon={faPenToSquare}/></button>
        <Modal close={closeModal} show={isOpen} modalTitle = {props.todo}></Modal>
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