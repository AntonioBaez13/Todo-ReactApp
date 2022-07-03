import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersRectangle,faXmark, faNoteSticky, faBarsProgress, faClock, 
    faCalendarXmark, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker'
import './EditTodoModal.css';
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from './GlobalFunctions';
import { TodoItemViewModel } from './Commands';
import axios from 'axios';

let todoItem;

function Modal(props){
    todoItem = new TodoItemViewModel(props.modalContent);
    const [todoItemObject, setTodoItemObject] = new useState(todoItem);

    const updateTodoItem = async(e) => {
        const resp = await axios.put(`https://localhost:5000/api/todo/${todoItemObject.id}`,
        todoItemObject);
        //Maybe Here i can trigger an update to the list of TODOS to reflect changes
    }

    if(!props.show) {
        return null;
    }
    
    return(
        <div className='modal-window' onClick={props.close}>
            <div className='modal-content' onClick={e=> e.stopPropagation()}>
                <ModalHeader close = {props.close}/>
                <ModalBody content={todoItemObject} updateContent={setTodoItemObject}/>
                <ModalFooter updateTodoItem={updateTodoItem}/>
            </div>
        </div>
    );
}

function ModalHeader(props){
    return(
        <div className='modal-header'>
            <button className = 'closemodal-button' onClick={props.close}><FontAwesomeIcon className='fa-solid faxMark fa-lg' icon={faXmark} /></button>
        </div>
    );
}

function ModalBody(props) {
    const content = props.content;
    
    return (
        <div className='modal-body'>
            <div>
                <textarea className='modal-title-format' rows={1}
                onChange={event => props.updateContent(prev => ({...prev, task:(event.target.value)}))}
                value={content.task}></textarea>
            </div>
            <div className='subsection-pairs'>
                <div>
                    <div>
                        <label className='modal-label'><FontAwesomeIcon icon={faClock} />Date Added</label>
                        <DatePicker selected={new Date(content.created)} disabled />
                    </div>
                    <StatusDropDown defaultSelection = {content.isCompleted} updateContent={props.updateContent}/>
                    <TeamDropDown defaultSelection={content.teamName} updateContent={props.updateContent} />
                </div>
                <div>
                    <div>
                        <label className='modal-label'><FontAwesomeIcon icon={faCalendarXmark} />Deadline</label>
                        <DatePickerModal date={content.dueDate} updateContent={props.updateContent} />
                    </div>

                    <div>
                        <label className='modal-label'><FontAwesomeIcon icon={faPeopleGroup} />Report To</label>
                        <input type="text" placeholder="Assigned By"></input>
                    </div>
                </div>
            </div>
            <div className='modal-notes'>
                <label className='modal-label'><FontAwesomeIcon icon={faNoteSticky} />Notes</label>
                    <form>
                        <textarea className='modal-note-area' placeholder={'Notes..'} 
                        value={content.notes !== null ? content.notes : undefined }
                        onChange={event => props.updateContent(prev => ({ ...prev, notes: (event.target.value) }))}>
                        </textarea>
                    </form>
            </div>            
        </div>
    );
}


function ModalFooter(props) {
    return (
        <div className='modal-footer'>
            <button className='save-modal-button' onClick={props.updateTodoItem}>Save Changes</button>
        </div>
    );
}

function DatePickerModal(props){
    const date = props.date;
    const updateContent = props.updateContent;
    const [startDate, setStartDate] = useState(date==null? null : new Date(date));

    useEffect(() => {
        updateContent(prev => ({ ...prev, dueDate : new Date(startDate).toISOString()}))
    }, [startDate,updateContent]);

    return (
    <DatePicker
        selected={startDate}
        placeholderText='Date'
        minDate={new Date()}
        onChange={(date) => setStartDate(date)}
    />);
}

function StatusDropDown(props){
    const statuses = ['New', 'In Progress', 'Done'];
    const updateContent = props.updateContent;
    const [selectedOption, setSelectedOption] = useState('New');

    useEffect(() => {
        updateContent(prev => ({ ...prev, isCompleted: (selectedOption === 'Done' ? true : false) }))
    }, [selectedOption,updateContent]);

    return(
        <div>
            <label className='modal-label'><FontAwesomeIcon icon={faBarsProgress} />Status</label>
            <Dropdown 
                className={'modal-dropbtn'}
                value={selectedOption}
                setValue={setSelectedOption}
                list={statuses}
                defaultText={'Select '}
            />
        </div>  
    )
}

function TeamDropDown(props) {
    const teams = ['Daybreak', 'DevOps', 'Others', 'Mobile']
    const updateContent = props.updateContent;
    const [selectedOption, setSelectedOption] = useState(props.defaultSelection == null ? '' : props.defaultSelection);

    useEffect(() => {
        updateContent(prev => ({ ...prev, teamName: selectedOption }))
    }, [selectedOption,updateContent]);

    return (
        <div>
            <label className='modal-label'><FontAwesomeIcon icon={faUsersRectangle} />Team</label>
            <Dropdown 
                className={'modal-dropbtn'}
                value={selectedOption}
                setValue={setSelectedOption}
                list={teams}
                defaultText={'Select'}
            />
        </div>
    )
}

export default Modal;