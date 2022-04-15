import { createLocalVideoTrack, LocalVideoTrack, ParticipantEvent, Room, RoomEvent } from 'livekit-client';
import { AudioSelectButton, VideoRenderer, VideoSelectButton } from 'livekit-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import server from '../../configs/axios-config';
import './prejoinpage.css';

export const PreJoinPage = () => {
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const { room_id } = useParams();
    const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
    const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
    const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();
    const room = new Room({
        adaptiveStream: true,
        dynacast: true,
    });

    useEffect(() => {
        async function fetchToken() {
            const res = await server.post(`rooms/${room_id}/token`);
            console.log(res);
            await room.connect(process.env.LIVEKIT_URL || 'ws://localhost:7880', res.data, {
                autoSubscribe: true,
            });
            room.on(RoomEvent.ParticipantConnected, (participant) => {
                participant.on(ParticipantEvent.TrackMuted, (publication) => {
                    console.log('participant: ' + participant);
                })
            })
            console.log(room);
        }
        fetchToken();
    });

    useEffect(() => {
        const listenResponse = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                const strData = decoder.decode(payload)
                const result = JSON.parse(strData)
                console.log(result);
            })
        }
        listenResponse();
    })

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
            }, 5000);
        } else {
            const track = await createLocalVideoTrack({
                deviceId: videoDevice?.deviceId,
            })
            setVideoEnabled(true)
            setVideoTrack(track)
            document.querySelector('.text-video')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-video')?.setAttribute('style', 'display:none');
            }, 5000);
        }
    }

    const toggleAudio = () => {
        if (audioEnabled) {
            setAudioEnabled(false)
            document.querySelector('.text-audio')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-audio')?.setAttribute('style', 'display:none');
            }, 5000);
        } else {
            setAudioEnabled(true)
            document.querySelector('.text-audio')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-audio')?.setAttribute('style', 'display:none');
            }, 5000);
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

    let videoElement: ReactElement;
    if (videoTrack) {
        videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
    } else {
        room.localParticipant.setCameraEnabled(false);
        videoElement = <div className="placeholder" />
    }

    const requestJoinRoom = async () => {
        await server.get(`rooms/${room_id}/req-join-room`)
            .then((result) => {
                document.querySelector('.hold-join')?.setAttribute('style', 'display:block');
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
                                <span className="text-video">Camera is enabled</span>
                            ) : (
                                <span className="text-video">Camera is disabled</span>
                            )}
                            {audioEnabled ? (
                                <h3 className='text-audio'>Mic is enabled</h3>
                            ) : (
                                <h3 className='text-audio'>Mic is disabled</h3>
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
                            <h3>Ready to join</h3>
                            <span>The others are here</span>
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
                            </div>
                            <div className='join-room'>
                                <button onClick={requestJoinRoom}>Join Now</button>
                            </div>
                            <div className='hold-join'>
                                <span>Waiting to join...</span>
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
