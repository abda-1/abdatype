import { useEffect, useState } from 'react';

// Hook to manage timer usage
const useTimer = ({initialTime, setInitialTime, testStarted, setTime}) => {

    useEffect(() => {
        let interval;

        // During test decrement time
        if (testStarted) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1;
                })
            }, 1000);
        }

        /** test 'not started' condition */
        return () => clearInterval(interval);

    }, [testStarted, setTime]);

    // Reset time
    const resetTimer = () => {
        setTime(initialTime);
    }

    return {resetTimer};

};

export default useTimer;