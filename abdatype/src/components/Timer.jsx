import React, { useEffect } from 'react';
import { useAppContext } from '../state/AppContext';

const Timer = () => {

    const {time, setTime, testStarted} = useAppContext();

    useEffect(() => {
        let interval;

        if (testStarted && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } 
        
        else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [time, setTime, testStarted]);

    return (
        <div className='timer'>
            <p>{time}</p>
        </div>
    );

};

export default Timer;