import React from 'react';
import './globalCss.css'

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

