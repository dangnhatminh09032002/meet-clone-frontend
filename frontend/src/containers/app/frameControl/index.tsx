import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './frameControl.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function frameControl() {
    
    const [hour, setHour] = useState<any>();
    const [minute, setMinute] = useState<any>();
    
    useEffect(() => {
        const realTime = setInterval(() => {
            const now = new Date();
            setHour(now.getHours());
            setMinute(now.getMinutes());
        }, 1000);
        return () => clearInterval(realTime);
    }, []);

    return (
        <div className="frameControl">
            <div className="frameControlLeft">
                <p>{hour < 10 ? '0' + hour : hour}: { minute < 10 ? '0' + minute : minute } &nbsp;</p>
                <p> |&nbsp;roomName </p>
            </div>
            <div className="frameControlCenter">
                <p>mic</p>
                <p>video</p>
                <p>share</p>
                <p>end</p>
            </div>
            <div className="frameControlRight">
                <div>USERS</div>
                <Link to="/">
                    <ChatBubbleIcon className="glo-color"/>
                </Link>
            </div>
        </div>
    );
}

export default frameControl;