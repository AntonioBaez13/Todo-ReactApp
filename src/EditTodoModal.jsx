import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersRectangle,faXmark, faNoteSticky, faBarsProgress, faClock, 
    faCalendarXmark, faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker'
import './EditTodoModal.css';
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from './GlobalFunctions';

function Modal(props){
    if(!props.show) {
        return null;
    }
    
    return(
        <div className='modal-window' onClick={props.close}>
            <div className='modal-content' onClick={e=> e.stopPropagation()}>
                <ModalHeader close = {props.close}/>
                <ModalBody content={props.modalContent}/>
                <ModalFooter/>
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
    console.log(content)
    
    return (
        <div className='modal-body'>
            <div>
                <h2 className='modal-title-format' contentEditable={true} 
                suppressContentEditableWarning={true}>{content.task}</h2>
            </div>
            <div className='subsection-pairs'>
                <div>
                    <div>
                        <label className='modal-label'><FontAwesomeIcon icon={faClock} />Date Added</label>
                        <DatePicker selected={new Date(content.created)} disabled />
                    </div>
                    <StatusDropDown defaultSelection = {content.isCompleted}/>
                    <TeamDropDown defaultSelection={content.teamName} />
                </div>
                <div>
                    <div>
                        <label className='modal-label'><FontAwesomeIcon icon={faCalendarXmark} />Deadline</label>
                        <DatePickerModal date={content.dueDate}/>
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
                        <textarea className='modal-note-area' placeholder='Notes...'></textarea>
                    </form>
            </div>            
        </div>
    );
}


function ModalFooter(props) {
    return (
        <div className='modal-footer'>
            <button className='save-modal-button'>Save Changes</button>
        </div>
    );
}

function DatePickerModal(props){
    const date = props.date;
    const [startDate, setStartDate] = useState(date==null? null : new Date(date));
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
    const [selectedOption, setSelectedOption] = useState('New');
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
    const [selectedOption, setSelectedOption] = useState(props.defaultSelection == null ? '' : props.defaultSelection);
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