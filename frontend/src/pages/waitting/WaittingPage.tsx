import React, { useState, useContext } from 'react';
import './waittingpage.css';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';

export function WaittingPage() {
    const [toggleMic, setToggleMic] = useState(true);
    const [toggleCamera, setToggleCamera] = useState(true);

    const navigate = useNavigate();
    const redirectUrL = (url: any) => {
        navigate('/room/' + url);
    };

    function onMic() {
        setToggleMic(!toggleMic);
    }

    function onCamera() {
        setToggleCamera(!toggleCamera);
    }
    return (
        <div className='container-waitting'>
            {/* <div className='header-waitting'>
                <div className='header-wapper-waitting'>
                    <div className='logo-waitting'>
                        <img
                            src='https://www.gstatic.com/meet/google_meet_primary_horizontal_2020q4_logo_be3f8c43950bd1e313525ada2ce0df44.svg'
                            alt=''
                        />
                    </div>
                    <div className='avatar-waitting'>
                        <img
                            src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                            alt=''
                        />
                    </div>
                </div>
            </div> */}
            <Header/>

            <div className='controll-waitting'>
                <div className='wapper-mic-camera'>
                    <div className='toggle-controll-btn'>
                        <button className='mic-btn' onClick={() => onMic()}>
                            {toggleMic ? (
                                <i className='bx bx-microphone'></i>
                            ) : (
                                <i className='bx bx-microphone-off'></i>
                            )}
                        </button>
                        <button className='camera-btn' onClick={() => onCamera()}>
                            {toggleCamera ? (
                                <i className='bx bx-video'></i>
                            ) : (
                                <i className='bx bx-video-off'></i>
                            )}
                        </button>
                    </div>
                </div>
                <div className='wapper-participant'>
                    <div className=''>
                        <h3>Sẵn sàng tham gia</h3>
                        <span>Những người khác ở đây</span>
                        <div className='view-participant'>
                            <i className='bx bx-user '></i>
                            <i className='bx bx-user '></i>
                            <i className='bx bx-user '></i>
                        </div>
                        <div className='join-room'>
                            <button >Tham gia ngay</button>
                        </div>
                        <div className='hold-join'>
                            <h3>Đang chờ tham gia...</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
