import { faKeyboard, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from '@mui/material/Popover';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import './homepage.css';

export function HomePage() {
    const [roomName, setRoomName] = useState('');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const hanleJoin = () => {
        navigate('/waitting');
    };

    return (
        <div className="home-page">
            <Header />
            <div className="body">
                <div className="left-side">
                    <div className="content">
                        <h1>Premium video meetings. Now free for everyone.</h1>
                        <p>
                        Unicorn for you, We&apos;re here to help you connect, communicate, and express your ideas so you can get more done together.
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
                                    onClick={() => hanleJoin()}
                                >
                  Join
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="help-text">
                        <a href="##">Learn more</a> about Unicorn
                    </div>
                </div>
                <div className="right-side">
                    <div className="content">
                        <img
                            src="https://res.cloudinary.com/boo-it/image/upload/v1648520776/test/zyweybprgst4qtus8y3e.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
