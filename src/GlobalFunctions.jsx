import React from 'react';
import './globalCss.css'
import { TeamNames, TodoItemStatus } from './Enums';
export const getFormattedDate = (param1) => {
    var date = new Date(param1);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    return date;
}

export function Dropdown(props) {
    const myList = props.list.map((item, i) => (
        <a key={i} onClick={() => props.setValue(item)}>{item}</a>
    ));

    return (
        <div className='dropdown'>
            <button className={props.className}>{props.value.length === 0
                ? props.defaultText
                : props.value}</button>
            <div className='dropdown-content'>{myList}</div>
        </div>
    );
}

export const getTeamName = (enumValue) => {
    let enumKey = Object.keys(TeamNames).find(key => TeamNames[key] === enumValue);
    return enumKey;
}

export const getStatusName = (enumValue) => {
    let enumKey = Object.keys(TodoItemStatus).find(key => TodoItemStatus[key] === enumValue);
    return enumKey;
}

export const ListOfTeams = Object.keys(TeamNames); 
export const ListOfStatuses = Object.keys(TodoItemStatus);
