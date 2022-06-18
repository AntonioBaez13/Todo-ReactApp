import React, { useState } from 'react';
import './AddTodo.css';

const utils = {
    teams: ['Daybreak', 'DevOps', 'Others', 'Mobile'],
}

const axios = require('axios').default;

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
    const [value, setValue] = useState('');

    const addNewTodoItem = (team, x) => {
        const obj1 = new TodoObject(team, x);
        props.addTodo(obj1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewTodoItem(team, value);
        axios.post('https://localhost:5000/api/Todo',{
            'task':value,
            'created':new Date(),
            'teamName': team ==='' ? null : team
        }).then(function(response){
            console.log(response);
        }).catch(function (error){
            console.log(error);
        });
        setValue('');
        setTeam('');;
    };

    return (
        <div className='rowC'>
            <Dropdown list={utils.teams} defaultText={"Choose a team"}
                value={team} setValue={setTeam} />
            <Input handleSubmit={handleSubmit}
                value={value} setValue={setValue} />
            <div className='dropdown'>
                <button className='dropbtn' onClick={handleSubmit}>
                    Add Item
                </button>
            </div>
        </div>
    );
}

export default AddTodo;