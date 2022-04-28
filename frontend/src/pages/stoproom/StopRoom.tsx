import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useNavigate, useParams } from 'react-router-dom';
import './stoproom.css';

export function StopRoom() {
    const navigate = useNavigate();
    const room_id = useParams();
    const numberCount = 60;

    const rejoinRoom = () => {
        navigate(`/room/${room_id.room_id}`);
    };

    const returnHome = () => {
        navigate(`/home`);
    };

    const renderTime = ({ remainingTime }: { remainingTime: any }) => {
        if (remainingTime === 0) {
            navigate('/home');
        }

        return (
            <div className='timer'>
                <div className='value'>{remainingTime}</div>
            </div>
        );
    };

    return (
        <div className='stop-room'>
            <div className='loading'>
                <div className='timer-wrapper'>
                    <CountdownCircleTimer
                        strokeWidth={4}
                        size={40}
                        isPlaying
                        duration={numberCount}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[60, 45, 15, 0]}
                        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
                <span>Going back to home screen</span>
            </div>
            <div className='nofify'>
                <h2>You have finished this meeting for everyone</h2>
                <div className='glo-btn'>
                    <button className='btn-rejoin' onClick={rejoinRoom}>
                        Rejoin
                    </button>
                    <button className='btn-return' onClick={returnHome}>
                        Return to the main screen
                    </button>
                </div>
            </div>
        </div>
    );
}
