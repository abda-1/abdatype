import { useEffect } from 'react';

/** use timer hook will manage timer's countdown + handle start/reset */
const useTimer = ({initialTime, testStarted, setTime}) => {

    /** timer logic */
    useEffect(() => {
        let interval;

        /** test started condition */
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

    /** reset timer */
    const resetTimer = () => {
        setTime(initialTime);
    }

    return {resetTimer};

};

export default useTimer;