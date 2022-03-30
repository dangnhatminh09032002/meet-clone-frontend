import React from 'react';
import './stoproom.css';

export function StopRoom() {
    return (
        <div className="stop-room">
            <h2>You have finished this meeting for everyone</h2>
            <div className="glo-btn">
                <button className="btn-rejoin">Rejoin</button>
                <button className="btn-return">Return to the main screen</button>
            </div>
        </div>
    );
}