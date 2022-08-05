import React from 'react';
import './TopBar.css';

function TopBar(props) {
    const user = {
        firstName: 'Antonio',
        lastName: 'Baez',
    };

    return (
        <div className='topbarcontainer'>
            <header className='topbar'>
                <h2 className='topbar-title'>Testing App</h2>
                <UserSettings userName={user}/>
            </header>
        </div>
    );
}

function UserSettings(props){

    const getName = () => {
        return `${props.userName.firstName} ${props.userName.lastName}`;
    };

    const getNameInitials = () => {
        let firstNameFirstLetter = props.userName.firstName.charAt(0);
        let lastNameFirstLetter = props.userName.lastName.charAt(0);
        return `${firstNameFirstLetter}${lastNameFirstLetter}`.toUpperCase();
    };

    return(
        <div className='topbar-nav'>
            <button className='topbar-menu-button'>
                <span>{getName()}</span>
                <span className='avatar'>
                    <span className='avatar-initials'>{getNameInitials()}</span>
                </span>
                <i className='arrow-icon'/>
            </button>
        </div>
    );
}
export default TopBar; 