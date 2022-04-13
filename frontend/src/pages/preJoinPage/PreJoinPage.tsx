import axios from 'axios';
import { createLocalVideoTrack, LocalVideoTrack, Room, VideoPresets, DataPacket_Kind } from 'livekit-client';
import { AudioSelectButton, VideoRenderer, VideoSelectButton } from 'livekit-react';
import React, { ReactElement, useEffect, useState, useContext } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import { GlobalContext } from '../../contexts/provider';
import './prejoinpage.css';

export const PreJoinPage = () => {
    const [url, setUrl] = useState('ws://localhost:7880');
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [token, setToken] = useState('');
    const { roomName } = useParams();
    const [connectDisabled, setConnectDisabled] = useState(true)
    const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
    const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
    const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();
    const authProvider = useContext<any>(GlobalContext);
    const {userDetailState } = authProvider;
    
    useEffect(() => {
        if (token && url) {
            setConnectDisabled(false)
        } else {
            setConnectDisabled(true)
        }
    }, [token, url])

    const toggleVideo = async () => {
        if (videoTrack) {
            videoTrack.stop()
            setVideoEnabled(false)
            setVideoTrack(undefined)
        } else {
            const track = await createLocalVideoTrack({
                deviceId: videoDevice?.deviceId,
            })
            setVideoEnabled(true)
            setVideoTrack(track)
        }
    }

    useEffect(() => {
        createLocalVideoTrack({
            deviceId: videoDevice?.deviceId,
        }).then((track) => {
            setVideoEnabled(true)
            setVideoTrack(track)
        })
    }, [videoDevice])

    const toggleAudio = () => {
        if (audioEnabled) {
            setAudioEnabled(false)
        } else {
            setAudioEnabled(true)
        }
    }

    const selectVideoDevice = (device: MediaDeviceInfo) => {
        setVideoDevice(device);
        if (videoTrack) {
            if (videoTrack.mediaStreamTrack.getSettings().deviceId === device.deviceId) {
                return
            }
            videoTrack.stop()
        }
    }

    const connectToRoom = async () => {
        if (videoTrack) {
            videoTrack.stop()
        }

        if (window.location.protocol === 'https:' &&
            url.startsWith('ws://') && !url.startsWith('ws://localhost')) {
            alert('Unable to connect to insecure websocket from https');
            return
        }

        const params: { [key: string]: string } = {
            url,
            token,
            videoEnabled: videoEnabled ? '1' : '0',
            audioEnabled: audioEnabled ? '1' : '0',
        }
        if (audioDevice) {
            params.audioDeviceId = audioDevice.deviceId;
        }
        if (videoDevice) {
            params.videoDeviceId = videoDevice.deviceId;
        } else if (videoTrack) {
            const deviceId = await videoTrack.getDeviceId();
            if (deviceId) {
                params.videoDeviceId = deviceId;
            }
        }
    }

    let videoElement: ReactElement;
    if (videoTrack) {
        videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
    } else {
        videoElement = <div className="placeholder" style={{backgroundColor:'green'}}/>
    }

    const requestJoinRoom = async () => {
        const res = await axios.get(`http://localhost:7880/api/room/req-join-room/${roomName}`);
        console.log(res);
    };

    window.addEventListener('resize', function () {
        if (window.outerWidth < 900) {
            this.document.querySelector('.wapper-videoSection')?.setAttribute('style', `width: ${window.outerWidth - 64}px`)
        } else {
            this.document.querySelector('.wapper-videoSection')?.setAttribute('style', 'width: 100%')
        }
    });

    return (
        <div className="prejoin">
            <main>
                <Header />
                <div className='wapper-content'>
                    <div className='wapper-videoSection'>
                        <div className="videoSection">
                            <span>Máy ảnh đang tắt</span>
                            {videoEnabled ? (
                                <div className='videoFrame'>
                                    <AspectRatio  ratio={16 / 9}>
                                        {videoElement }
                                    </AspectRatio>
                                </div>
                            ) : (
                                <div className='videoInvisible' ></div>
                            )}
                            <div className='controlMicCam'>
                                <AudioSelectButton
                                    className='toggleMic'
                                    isMuted={!audioEnabled}
                                    onClick={toggleAudio}
                                    onSourceSelected={setAudioDevice}
                                />
                                <VideoSelectButton
                                    className='toggleCamera'
                                    isEnabled={videoTrack !== undefined}
                                    onClick={toggleVideo}
                                    onSourceSelected={selectVideoDevice}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wapper-participant'>
                        <div className='join-section'>
                            <h3>Sẵn sàng tham gia</h3>
                            <span>Những người khác ở đây</span>
                            <div className='view-participant'>
                                <div className='join-participant'>
                                    <img
                                        src='https://res.cloudinary.com/boo-it/image/upload/v1639308280/test/i0nstrxf9xgkux4mjucd.png'
                                        alt=''
                                    />
                                    <img
                                        src='https://res.cloudinary.com/boo-it/image/upload/v1639308280/test/i0nstrxf9xgkux4mjucd.png'
                                        alt=''
                                    />
                                    <img
                                        src='https://res.cloudinary.com/boo-it/image/upload/v1639308280/test/i0nstrxf9xgkux4mjucd.png'
                                        alt=''
                                    />
                                </div>
                                <span>Ai đang ở đây</span>
                            </div>
                            <div className='join-room'>
                                <button onClick={requestJoinRoom}>Tham gia ngay</button>
                            </div>
                            <div className='hold-join'>
                                <h3>Đang chờ tham gia...</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
            </footer>
        </div>
    );
};
