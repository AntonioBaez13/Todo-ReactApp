import React, { useState } from 'react';
import { Header } from './ListOfTodos';
import './ListOfTesters.css';
import './ListOfTodos.css';
import './TopBar.css';

const testData = [
    { firstname: "Antonio", lastName: "Baez", initials: "AB", team: "Daybreak", joined: "July 2021", codeReviewer: "Yes"},
    { firstname: "Ross", lastName: "Doe", initials: "RS", team: "Galaxy", joined: "July 2019", codeReviewer: "Yes"},
    { firstname: "Jean", lastName: "Paul", initials: "JS", team: "KnightFall", joined: "April 2018", codeReviewer: "Yes"},
    { firstname: "Igor", lastName: "Culpin", initials: "IC", team: "Daybreak", joined: "March 2022", codeReviewer: "No"},
];

function TestersContainer(props) {
    return (
        <div className='todo-list-container'>
            <Header title={'Testers List'} />
            <div className='widget-content'>
                <CardList testers={testData} />
            </div>
        </div>
    );
}

function CardList(props){
    return(
        <div>
            { props.testers.map((tester, i) => <Card key={i} {...tester} />)}
        </div>
    );
}

function Card(props){
    const getName = () => {
        return `${props.firstname} ${props.lastName}`;
    }

    //const getNameInitials = () => {
    //    let firstNameFirstLetter = props.firstname.charAt(0);
    //    let lastNameFirstLetter = props.lastname.charAt(0);
    //    return `${firstNameFirstLetter}${lastNameFirstLetter}`.toUpperCase();
    //}

    return(
        <div className='tester-card'>
            <span className='avatar'>
                <span className='avatar-initials'>{props.initials}</span>
            </span>
            <div className='info'>
                <div className='name'>{getName()}</div>
                <div className='team'>{props.team}</div>
                <div className='experience'>
                    <div><span className='bold'>Hub Since: </span> {props.joined}</div>
                    <div className='reviewer'><span className='bold'>Code Reviewer: </span> {props.codeReviewer}</div>
                </div>
            </div>
        </div>
    );
}

export default TestersContainer;