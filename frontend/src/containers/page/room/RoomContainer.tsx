import React from 'react';
import FrameChat from '../../app/frameChat';
import FrameControl from '../../app/frameControl';
import FrameParticipants from '../../app/frameParticipants';
import './RoomContainer.css';

function RoomPage() {
    return (
        <div className="containerRoom">
            <FrameParticipants />
            <FrameControl />
            <FrameChat />
        </div>
    );
}

export default RoomPage;
