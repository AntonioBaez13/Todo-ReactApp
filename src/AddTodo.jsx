import React, { useRef, useState } from 'react';
import './AddTodo.css';
import { TeamNames } from './Enums';
import { Dropdown } from './GlobalFunctions';
import { ListOfTeams } from './GlobalFunctions';
import './ListOfTodos.css';
import { faPlus, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

//WORK IN PROGRESS ALL ADDED BELOW ARE THE NEW CLASSES FOR THE NEW ADD TASK COMPONENT
function AddTodoContainer(props) { 
    const [isExpanded, setIsExpanded] = useState(false);
    const [team, setTeam] = useState('');
    const [value, setValue] = useState('');
    const addTaskInput = useRef(null);

    const expandAddTodoSection = () => {
        setIsExpanded(true);
        addTaskInput.current.focus();
    }

    const collapseAddTodoSection = () => {
        setIsExpanded(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await axios.post('https://localhost:5000/api/Todo', {
            'task': value,
            'created': new Date(),
            'teamName': team === '' ? null : TeamNames[team],
            'status': 0
        });
        props.addTodo(resp.data)
        setValue('');
        setTeam('');;
    };

    return(
        <span>
            <div className='addnewtodo'>
                <div className='addtasksection'>
                    <span className='checkboxcontainer'>
                        {isExpanded
                            ? <span className='checkmark' onClick={() => collapseAddTodoSection() }/>
                            : <button className='addtodoplusbutton' onClick={() => expandAddTodoSection()}><FontAwesomeIcon icon={faPlus} /></button>
                        }
                    </span>
                    <div className='container'>
                        <form onSubmit={handleSubmit}>
                            <input 
                                ref={addTaskInput}
                                onFocus={expandAddTodoSection}
                                className='addtodoinputfield'
                                maxLength={255}
                                spellCheck='true'
                                type='text'
                                value={value}
                                onChange={event => setValue(event.target.value)}
                                placeholder='Add Task'
                                required={true}/>
                        </form>
                    </div>
                </div>
                    {isExpanded
                        ?<div className='addtasksubsection'>
                            <div className='addtaskdropdowncontainer'>
                                <Dropdown 
                                    className='dropbtnbutton' 
                                    value={team} 
                                    setValue={setTeam} 
                                    list={ListOfTeams} 
                                    defaultText={<label className='modal-label'>
                                        <FontAwesomeIcon icon={faUsersRectangle} />Team</label>} />
                            </div>
                            <button className='addtaskbutton' onClick={handleSubmit} disabled={!value}>Add Task</button>
                        </div>
                        : null
                    }
            </div>
        </span>
    );
}

function AddTaskSubSection(props) {
    //To replace by this component
    //<AddTaskSubSection team={team} setTeam={setTeam} value={value} handleSubmit={handleSubmit}/>
    return (
        <div className='addtasksubsection'>
            <div className='addtaskdropdowncontainer'>
                <Dropdown
                    className='dropbtnbutton'
                    value={props.team}
                    setValue={props.setTeam}
                    list={ListOfTeams}
                    defaultText={<label className='modal-label'>
                        <FontAwesomeIcon icon={faUsersRectangle} />Team</label>} />
            </div>
            <button className='addtaskbutton' onClick={props.handleSubmit} disabled={!props.value}>Add Task</button>
        </div>
    )
}

function AddTaskInput(props) {
    //to replace with 
    //<AddTaskInput handleSubmit={handleSubmit} value = { value } setValue = { setValue } 
    //addTaskInput={addTaskInput} expandAddTodoSection={expandAddTodoSection} />
    
    return (
        <form onSubmit={props.handleSubmit}>
            <input
                ref={props.addTaskInput}
                onFocus={props.expandAddTodoSection}
                className='addtodoinputfield'
                maxLength={255}
                spellCheck='true'
                type='text'
                value={props.value}
                onChange={event => props.setValue(event.target.value)}
                placeholder='Add Task'
                required={true} />
        </form>
    );
}

export {AddTodo, AddTodoContainer};