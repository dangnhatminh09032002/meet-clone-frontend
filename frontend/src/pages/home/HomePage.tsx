import React, { useState } from 'react';
import { faKeyboard, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from '@mui/material/Popover';
import { Header } from '../../components/HomeHeader/HomeHeader';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const [roomName, setRoomName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const redirectUrL = (url: any) => {
        navigate('/room/' + url);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="home-page">
            <Header />
            <div className="body">
                <div className="left-side">
                    <div className="content">
                        <h1>Premium video meetings. Now free for everyone.</h1>
                        <p>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
                        </p>
                        <div className="action-btn">
                            <button className="btn green" onClick={handleClick}>
                                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                New Meeting
                            </button>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <div className="btn-meeting">
                                    <button className="btn-conversations">
                    Join the meeting
                                    </button>
                                    <br></br>
                                    <button className="btn-conversations">
                    Create new meeting
                                    </button>
                                </div>
                            </Popover>
                            <div className="input-block">
                                <div className="input-section">
                                    <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                                    <input
                                        placeholder="Enter a code or link"
                                        onChange={(e) => setRoomName(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn no-bg btn-join"
                                    onClick={() => redirectUrL(roomName)}
                                >
                  Join
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="help-text">
                        <a href="##">Learn more</a> about Google Meet
                    </div>
                </div>
                <div className="right-side">
                    <div className="content">
                        <img
                            src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
