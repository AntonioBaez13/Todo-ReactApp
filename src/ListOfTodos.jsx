import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './ListOfTodos.css';
import Modal from './EditTodoModal'
import { TodoItemViewModel } from './Commands';
import { AddTodoContainer } from './AddTodo';
//import axios from 'axios';

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
            <Checkbox content={todoItem} updateContent={setTodoItem} />
            <div className='container'>
                {todoItem.task}
            </div>
            <button className='edit-todo' onClick={openModal}><FontAwesomeIcon icon={faPenToSquare}/></button>
            <Modal close={closeModal} show={isOpen} modalContent={todoItem} updateModalContent={setTodoItem}></Modal>
        </div>
    );
}

function Checkbox(props){
    let todoItem = props.content;
    
    //TODO in the future, because at the moment I do not understand how to get this to work in sync
    //    const [todoItemState, setTodoItemState] = new useState(todoItem)
    // const updateStatusOfSingleTodoItem = async(newStatus) => {
    //     await axios.put(`https://localhost:5000/api/todo/${todoItem.id}/updatestatus/${newStatus}`)
    //         .then(() => {
    //             todoItem.status = newStatus;
    //             setTodoItemState(todoItem);
    //             props.updateContent(todoItem);
    //         });
    // }
    // to add to each return of the switch statement onClick={()=> updateStatusOfSingleTodoItem(2)}

    const renderTodoStatusCircle = (status) =>{
        switch(status){
            case 0:
                return (<span className='checkmark' />);
            case 1:
                return (<span className='checkmarkinprogress' />);
            case 2:
                return (
                    <div className='checkboxcontainer'>
                        <span className='bluecheckmark'/>
                        <span className='checkmarkafter'/>
                    </div>);
            default:
                console.log('default')
                return (<span className='checkmark' />);
        }
    }

    return (
        <span className='checkboxcontainer'>
            <>{renderTodoStatusCircle(todoItem.status)}</>
        </span>
    );
}

function TodoContainer(props) {
    //I need to perform some kind of OnMount,
    //so that when mounting i can get all the items that are on the 
    //database for today
    const [todo, setTodo] = useState([]);
    const addTodo = (x) => {
        setTodo([...todo, x]);
    };

    return (
        <div className='todo-list-container'>
            <Header title={'Todo List'}/>
            <div className='widget-content'>
                <AddTodoContainer addTodo={addTodo}/>
                <TodoList todos={props.todos}/>
            </div>
        </div>
    );
}

export {TodoContainer, Header};