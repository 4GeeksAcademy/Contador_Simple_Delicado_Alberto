import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import SecondsCounter from './components/SecondsCounter';

const App = () => {
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const [targetTime, setTargetTime] = useState(0);

    useEffect(() => {
        let interval;
        
        if (!isPaused) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (isCountdown) {
                        if (prevSeconds <= 0) {
                            clearInterval(interval);
                            setIsPaused(true);
                            if (targetTime > 0) {
                                alert(`¡Tiempo alcanzado! Se completaron ${targetTime} segundos.`);
                            }
                            return 0;
                        }
                        return prevSeconds - 1;
                    } else {
                        return prevSeconds + 1;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPaused, isCountdown, targetTime]);

    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);
    const handleReset = () => {
        setSeconds(isCountdown ? targetTime : 0);
        setIsPaused(true);
    };

    const handleSetCountdown = (time) => {
        setTargetTime(time);
        setSeconds(time);
        setIsCountdown(true);
        setIsPaused(false);
    };

    return (
        <SecondsCounter 
            seconds={seconds}
            isCountdown={isCountdown}
            isPaused={isPaused}
            onPause={handlePause}
            onResume={handleResume}
            onReset={handleReset}
            onSetCountdown={handleSetCountdown}
            targetTime={targetTime}
        />
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
