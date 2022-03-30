import { faKeyboard, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover from '@mui/material/Popover';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import './homepage.css';
import { GlobalContext } from './../../contexts/provider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../configs/firebase-config';
import { authDetailData } from '../../contexts/auth';
import { userDetailData } from '../../contexts/user';

export function HomePage() {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const authProvider = useContext<any>(GlobalContext);
    const {authDetailState, authDetailDispatch, userDetailState, userDetailDispatch} = authProvider;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const idToken = await auth.currentUser?.getIdToken(true);
                const res = await axios.post(
                    'http://localhost:8080/api/auth/google',
                    { idToken },
                    { withCredentials: true }
                )
                    .then( async () => {
                        await authDetailDispatch(authDetailData({isLogin: true}));
                        await userDetailDispatch(userDetailData({
                            uid_google: result.user.uid,
                            full_name: `${result.user.displayName}`,
                            avaURL: `${result.user.photoURL}`,
                        })); 
                    });                    
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const hanleJoin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const idToken = await auth.currentUser?.getIdToken(true);
                const res = await axios.post(
                    'http://localhost:8080/api/auth/google',
                    { idToken },
                    { withCredentials: true }
                )
                    .then( async () => {
                        await authDetailDispatch(authDetailData({isLogin: true}));
                        await userDetailDispatch(userDetailData({
                            uid_google: result.user.uid,
                            full_name: `${result.user.displayName}`,
                            avaURL: `${result.user.photoURL}`,
                        })); 
                    });
                navigate('/waitting');

            })
            .catch((err) => {
                console.log(err);
            });
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
                            {authDetailState.payload.isLogin === true ? (
                                <button className="btn green" onClick={handleClick}>
                                    <FontAwesomeIcon className="icon-block" icon={faVideo} />
                                    New Meeting
                                </button>
                            ) : (
                                <button className="btn green" onClick={signInWithGoogle}>
                                    <FontAwesomeIcon className="icon-block" icon={faVideo} />
                                    New Meeting
                                </button>
                            )} 
                            
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
