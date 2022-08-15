import React, { useState, useEffect } from 'react';
import './Metrics.css';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Dropdown, ListOfTimeFrames, getTimeFrame } from './GlobalFunctions';
import './EditTodoModal.css'
import { TaskAddedDateViewModel, TasksTimeFrameCommand } from './Commands';
import axios from 'axios';

function Metrics(props) {
    const [isLoading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('Last 7 Days');
    const [numberOfTasks, setNumberOfTasks] = useState();

    useEffect(() => {
        setLoading(true);
        const command = new TasksTimeFrameCommand({
            date:new Date().toISOString(), 
            timeFrame: getTimeFrame(timeRange)});
         axios.post('https://localhost:5000/api/Todo/getTotalCreated', command).then(response => {
            setNumberOfTasks(new TaskAddedDateViewModel(response.data));
            setLoading(false);
        });
    }, [timeRange]);

    if (isLoading) {
        return (null);
    }//refactor so that it does not disapear and appear each time it changes and instead it just loads the rings 

    return (
        <div className='metricsBoxSection'>
            <div className='metrixboxheader'>
                <label className='headertext'>Metrics</label>
                <div className='timedropdowncontainer'>
                    <Dropdown
                        className='timesdropdwn'
                        value={timeRange}
                        setValue={setTimeRange}
                        list={ListOfTimeFrames}
                        defaultText={timeRange} />
                </div>
            </div>
            <RingProgress data={numberOfTasks}/>
        </div>
    );
}

function RingProgress (props){
    const data = props.data;

    return(
        <div className='progressrings'>
            <div className='progressringcontainer'>
                <CircularProgressbarWithChildren value={data.new} maxValue={data.totalCreated}
                    styles={buildStyles({
                        pathColor: '#ffeb7a'
                    })}>
                    <div className='ringchildtext'>New</div>
                    <label className='ringchildtextlabel'>{data.new}</label>
                </CircularProgressbarWithChildren>
            </div>
            <div className='progressringcontainer'>
                <CircularProgressbarWithChildren value={data.inProgress} maxValue={data.totalCreated}
                    styles={buildStyles({
                        pathColor: '#2196F3'
                    })}>
                    <div className='ringchildtext'>In Progress</div>
                    <label className='ringchildtextlabel'>{data.inProgress}</label>
                </CircularProgressbarWithChildren>
            </div>
            <div className='progressringcontainer'>
                <CircularProgressbarWithChildren value={data.completed} maxValue={data.totalCreated}
                    styles={buildStyles({
                        pathColor: '#63b521'
                    })}>
                    <div className='ringchildtext'>Completed</div>
                    <label className='ringchildtextlabel'>{data.completed}</label>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    );

}

export {Metrics};