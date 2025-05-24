import React from "react";
import PropTypes from "prop-types";

const SecondsCounter = ({ 
    seconds, 
    isCountdown, 
    isPaused,
    onPause,
    onResume,
    onReset,
    onSetCountdown,
    targetTime 
}) => {
    const digits = String(seconds).padStart(6, '0').split('').map(Number);

    const handleCountdownInput = () => {
        const time = prompt("Ingresa el tiempo en segundos para la cuenta regresiva:");
        if (time && !isNaN(time) && parseInt(time) > 0) {
            onSetCountdown(parseInt(time));
        }
    };

    return (
        <div className="counter-wrapper">
            <div className="counter-container">
                <div className="clock-icon">
                    <i className={`far ${isCountdown ? 'fa-hourglass' : 'fa-clock'}`}></i>
                </div>
                {digits.map((digit, index) => (
                    <div key={index} className="digit">
                        {digit}
                    </div>
                ))}
            </div>
            
            <div className="controls-container">
                {isPaused ? (
                    <button className="control-btn" onClick={onResume}>
                        <i className="fas fa-play"></i> Reanudar
                    </button>
                ) : (
                    <button className="control-btn" onClick={onPause}>
                        <i className="fas fa-pause"></i> Pausar
                    </button>
                )}
                
                <button className="control-btn" onClick={onReset}>
                    <i className="fas fa-undo"></i> Reiniciar
                </button>
                
                <button className="control-btn" onClick={handleCountdownInput}>
                    <i className="fas fa-hourglass-start"></i> Cuenta Regresiva
                </button>
            </div>

            {targetTime > 0 && (
                <div className="target-time">
                    Tiempo objetivo: {targetTime} segundos
                </div>
            )}
        </div>
    );
};

SecondsCounter.propTypes = {
    seconds: PropTypes.number.isRequired,
    isCountdown: PropTypes.bool,
    isPaused: PropTypes.bool,
    onPause: PropTypes.func,
    onResume: PropTypes.func,
    onReset: PropTypes.func,
    onSetCountdown: PropTypes.func,
    targetTime: PropTypes.number
};

SecondsCounter.defaultProps = {
    isCountdown: false,
    isPaused: false,
    targetTime: 0
};

export default SecondsCounter; 