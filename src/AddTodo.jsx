import React, { useState } from 'react';
import './AddTodo.css';
import { TeamNames } from './Enums';
import { Dropdown } from './GlobalFunctions';
import { ListOfTeams } from './GlobalFunctions';

const axios = require('axios').default;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post('https://localhost:5000/api/Todo',{
            'task':value,
            'created':new Date(),
            'teamName': team === '' ? null : TeamNames[team],
            'status': 0 
        });
        props.addTodo(resp.data)
        setValue('');
        setTeam('');;
    };

    return (
        <div className='rowC'>
            <Dropdown list={ListOfTeams} defaultText={"Choose a team"}
                value={team} setValue={setTeam} className={'dropbtn'}/>
            <Input handleSubmit={handleSubmit}
                value={value} setValue={setValue} />
            <div className='dropdown'>
                <button className='dropbtn' onClick={handleSubmit} disabled={!value}>
                    Add Item
                </button>
            </div>
        </div>
    );
}

export default AddTodo;