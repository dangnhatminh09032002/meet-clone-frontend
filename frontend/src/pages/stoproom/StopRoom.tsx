import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './stoproom.css';

export function StopRoom() {
    const navigate = useNavigate();
    const room_id = useParams();
    const RejoinRoom = () => {
        navigate(`/prejoinroom/${room_id}`);
    };
    return (
        <div className='stop-room'>
            <h2>You have finished this meeting for everyone</h2>
            <div className='glo-btn'>
                <button className='btn-rejoin' onClick={RejoinRoom}>
                    Rejoin
                </button>
                <button className='btn-return'>Return to the main screen</button>
            </div>
        </div>
    );
}
