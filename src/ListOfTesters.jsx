import React, { useEffect, useState } from 'react';
import { Header } from './ListOfTodos';
import { getFormattedDate, getTeamName } from './GlobalFunctions';
import './ListOfTesters.css';
import './ListOfTodos.css';
import './TopBar.css';

const axios = require('axios').default;

function TestersContainer(props) {
    const [testersData, setTesterData] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:5000/api/Testers').then(response => {
            setTesterData(response.data);
            setLoading(false);
        });
    },[]);

    if (isLoading) {
        //We are trying to retreive the elements from the database
        //So load, and then render
        return (null);
    }

    return (
        <div className='todo-list-container'>
            <Header title={'Testers List'} />
            <div className='widget-content'>
                <CardList testers={testersData} />
            </div>
        </div>
    );
}

function CardList(props){
    return(
        <div>
            { props.testers.map(tester => <Card key={tester.id} {...tester} />)}
        </div>
    );
}

function Card(props){
    const tester = props;

    const getName = () => {
        return `${tester.firstName} ${tester.lastName}`;
    }

    const getNameInitials = () => {
        let firstNameFirstLetter = tester.firstName.charAt(0);
        let lastNameFirstLetter = tester.lastName.charAt(0);
        return `${firstNameFirstLetter}${lastNameFirstLetter}`.toUpperCase();
    };

    return(
        <div className='tester-card'>
            <span className='avatar'>
                <span className='avatar-initials'>{getNameInitials()}</span>
            </span>     
            <div className='info'>
                <div className='name'>{getName()}</div>
                <div className='team'>{getTeamName(tester.teamName)}</div>
                <div className='experience'>
                    <div><span className='bold'>Hub Since: </span> {getFormattedDate(tester.joinedHub)}</div>
                    <div className='reviewer'><span className='bold'>Code Reviewer: </span> {tester.codeReviewer === true ? "Yes" : "No"}</div>
                </div>
            </div>
        </div>
    );
}

export default TestersContainer;