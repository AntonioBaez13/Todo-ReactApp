import React, { useState } from 'react';
import './AddTodo.css';

const utils = {
    teams: ['Daybreak', 'DevOps', 'Others', 'Mobile'],
    priority: [1, 2, 3, 4, 5],
}

function TodoObject(team, todo, priority) {
    this.team = team;
    this.todo = todo;
    this.priority = priority;
}

function Dropdown(props) {
    const myList = props.list.map((item, i) => (
        <a key={i} onClick={() => props.setValue(item)}>{item}</a>
    ));

    return (
        <div className='dropdown'>
            <button className='dropbtn'>{props.value.length === 0
                ? props.defaultText
                : props.value}</button>
            <div className='dropdown-content'>{myList}</div>
        </div>
    );
}

function Input(props) {
    return (
        <form className='formContainer' onSubmit={props.handleSubmit}>
            <input
                spellCheck='true'
                className='inputField'
                type="text"
                value={props.value}
                onChange={event => props.setValue(event.target.value)}
                placeholder="Specify TODO"
                required />
        </form>
    );
}

function AddTodo(props) {
    const [team, setTeam] = useState('');
    const [priority, setPriority] = useState('');
    const [value, setValue] = useState('');

    const addNewTodoItem = (team, x, priority) => {
        const obj1 = new TodoObject(team, x, priority);
        props.addTodo(obj1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewTodoItem(team, value, priority);
        setValue('');
        setTeam('');;
        setPriority('');
    };

    return (
        <div className='rowC'>
            <Dropdown list={utils.teams} defaultText={"Choose a team"}
                value={team} setValue={setTeam} />
            <Input handleSubmit={handleSubmit}
                value={value} setValue={setValue} />
            <Dropdown list={utils.priority} defaultText={"Specify Priority"}
                value={priority} setValue={setPriority} />
        </div>
    );
}

export default AddTodo;