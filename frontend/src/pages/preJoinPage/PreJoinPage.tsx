import axios from 'axios';
import { createLocalVideoTrack, LocalVideoTrack, Room } from 'livekit-client';
import { AudioSelectButton, VideoRenderer, VideoSelectButton } from 'livekit-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import './prejoinpage.css';

export const PreJoinPage = () => {
    const [url, setUrl] = useState('ws://localhost:7880');
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [token, setToken] = useState('');
    const { roomName } = useParams();
    const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
    const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
    const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();

    const room = new Room({
        adaptiveStream: true,
        dynacast: true,
    });

    useEffect(() => {

        async function fetchToken() {
            const res = await axios.get(`http://localhost:8080/api/room/get-token/${roomName}`, { withCredentials: true })
            setToken(res.data.data);
            await room.connect(`${url}`, token, {
                autoSubscribe: true,
            });
            console.log(room);
        }
        fetchToken();
    }, [token, url, roomName]);

    useEffect(() => {
        createLocalVideoTrack({
            deviceId: videoDevice?.deviceId,
        }).then((track) => {
            setVideoEnabled(true)
            setVideoTrack(track)
        })
    }, [videoDevice])

    const toggleVideo = async () => {
        if (videoTrack) {
            videoTrack.stop()
            setVideoEnabled(false)
            setVideoTrack(undefined)
            setAudioEnabled(false)
            document.querySelector('.text-video')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-video')?.setAttribute('style', 'display:none');
            }, 2000);
        } else {
            const track = await createLocalVideoTrack({
                deviceId: videoDevice?.deviceId,
            })
            setVideoEnabled(true)
            setVideoTrack(track)
            document.querySelector('.text-video')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-video')?.setAttribute('style', 'display:none');
            }, 2000);
        }
    }

    const toggleAudio = () => {
        if (audioEnabled) {
            setAudioEnabled(false)
            document.querySelector('.text-audio')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-audio')?.setAttribute('style', 'display:none');
            }, 2000);
        } else {
            setAudioEnabled(true)
            document.querySelector('.text-audio')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-audio')?.setAttribute('style', 'display:none');
            }, 2000);
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
        room.localParticipant.setCameraEnabled(false);
        videoElement = <div className="placeholder" />
    }

    const requestJoinRoom = async () => {
        await axios.get(`http://localhost:8080/api/room/req-join-room/${roomName}`, { withCredentials: true })
            .then(() => {
                document.querySelector('.hold-join')?.setAttribute('style', 'display:flex');
            })
            .catch((err) => {
                console.log(err);
            })

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
                            {videoEnabled ? (
                                <span className="text-video">Máy ảnh đang bật</span>
                            ) : (
                                <span className="text-video">Máy ảnh đang tắt</span>
                            )}
                            {audioEnabled ? (
                                <h3 className='text-audio'>Mic đang bật</h3>
                            ) : (
                                <h3 className='text-audio'>Mic đang tắt</h3>
                            )}
                            {videoEnabled ? (
                                <div className='videoFrame'>
                                    <AspectRatio ratio={16 / 9}>
                                        {videoElement}
                                    </AspectRatio>
                                </div>
                            ) : (
                                <div className='videoInvisible'></div>
                            )}
                            <div className='controlMicCam'>
                                <div>
                                    <AudioSelectButton
                                        className='toggleMic'
                                        isMuted={!audioEnabled}
                                        onClick={toggleAudio}
                                        onSourceSelected={setAudioDevice}
                                    />
                                </div>
                                <div>
                                    <VideoSelectButton
                                        className='toggleCamera'
                                        isEnabled={videoTrack !== undefined}
                                        onClick={toggleVideo}
                                        onSourceSelected={selectVideoDevice}
                                    />
                                </div>

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
