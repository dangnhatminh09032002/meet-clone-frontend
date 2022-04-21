import { createLocalVideoTrack, LocalVideoTrack, Room, RoomEvent } from 'livekit-client';
import { AudioSelectButton, VideoRenderer, VideoSelectButton } from 'livekit-react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import { server } from '../../configs/axios-config';
import './prejoinpage.css';

const room = new Room({
    adaptiveStream: true,
    dynacast: true,
});

export const PreJoinPage = () => {
    const [listParticipants, setListPaticipants] = useState<any>([]);
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
    const { room_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
    const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
    const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        server
            .get(`rooms/${room_id}`)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                navigate({ pathname: '/home' });
            });
    }, []);

    useEffect(() => {
        if (!loading) {
            const fetchToken = async () => {
                const res = await server.post(`rooms/${room_id}/token`);
                await room.connect(process.env.LIVEKIT_URL || 'ws://localhost:7880', res.data, {
                    autoSubscribe: false,
                });
                const decoder = new TextDecoder();
                room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                    const strData = decoder.decode(payload);
                    const result = JSON.parse(strData);
                    if (
                        result.type === 'room' &&
                        result.action === 'res-join-room' &&
                        result?.payload.data.is_allow
                    ) {
                        navigate('/room/' + room_id);
                    } else {
                        document.querySelector('.hold-join')?.setAttribute('style', 'display:none');
                        document.querySelector('.reject')?.setAttribute('style', 'display:block');
                    }
                });
            };
            fetchToken();
        }
    }, [loading]);

    useEffect(() => {
        return () => {
            if (!loading) {
                setVideoEnabled(false);
                setAudioEnabled(false);
                videoTrack?.stop();
            }
        };
    }, [loading, videoTrack]);

    useEffect(() => {
        if (!loading) {
            if (location.pathname.includes('/prejoinroom')) {
                createLocalVideoTrack({
                    deviceId: videoDevice?.deviceId,
                }).then((track) => {
                    setVideoEnabled(true);
                    setVideoTrack(track);
                });
            }
        }
    }, [loading, videoDevice]);

    useLayoutEffect(() => {
        const listPaticipant = async () => {
            await server.get(`rooms/${room_id}/participants`).then(async (result) => {
                await setListPaticipants(result.data);
            });
        };
        listPaticipant();
    }, [room_id]);

    const requestJoinRoom = async () => {
        await server
            .get(`rooms/${room_id}/req-join-room`)
            .then(() => {
                document.querySelector('.hold-join')?.setAttribute('style', 'display:block');
            })
            .catch((err) => {
                throw err;
            });
    };

    const toggleVideo = async () => {
        if (videoTrack) {
            videoTrack.stop();
            setVideoEnabled(false);
            setVideoTrack(undefined);
            document.querySelector('.text-video')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-video')?.setAttribute('style', 'display:none');
            }, 5000);
        } else {
            const track = await createLocalVideoTrack({
                deviceId: videoDevice?.deviceId,
            });
            setVideoEnabled(true);
            setVideoTrack(track);
            document.querySelector('.text-video')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-video')?.setAttribute('style', 'display:none');
            }, 5000);
        }
    };

    const toggleAudio = () => {
        if (audioEnabled) {
            setAudioEnabled(false);
            document.querySelector('.text-audio')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-audio')?.setAttribute('style', 'display:none');
            }, 5000);
        } else {
            setAudioEnabled(true);
            document.querySelector('.text-audio')?.setAttribute('style', 'display:block');
            setTimeout(() => {
                document.querySelector('.text-audio')?.setAttribute('style', 'display:none');
            }, 5000);
        }
    };

    const selectVideoDevice = (device: MediaDeviceInfo) => {
        setVideoDevice(device);
        if (videoTrack) {
            if (videoTrack.mediaStreamTrack.getSettings().deviceId === device.deviceId) {
                return;
            }
            videoTrack.stop();
        }
    };

    let videoElement;
    if (videoTrack) {
        videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
    } else {
        videoElement = <div className='placeholder' />;
    }
    console.log(listParticipants);

    if (loading) return <></>;
    return (
        <div className='prejoin'>
            <main>
                <Header />
                <div className='wapper-content'>
                    <div className='wapper-videoSection'>
                        <div className='videoSection'>
                            {videoEnabled ? (
                                <span className='text-video'>Camera is enabled</span>
                            ) : (
                                <span className='text-video'>Camera is disabled</span>
                            )}
                            {audioEnabled ? (
                                <h3 className='text-audio'>Mic is enabled</h3>
                            ) : (
                                <h3 className='text-audio'>Mic is disabled</h3>
                            )}
                            <div className='videoFrame'>
                                <AspectRatio ratio={16 / 9}>{videoElement}</AspectRatio>
                            </div>
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
                            <div className='view-participant'>
                                <div className='join-participant'>
                                    <div style={{ display: 'flex' }}>
                                        {listParticipants?.map((item: any, index: number) => (
                                            <div key={index}>
                                                <img
                                                    src={item.picture}
                                                    alt=''
                                                    referrerPolicy='no-referrer'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {listParticipants?.length > 2 && (
                                            <div>
                                                <p style={{ display: 'flex' }}>
                                                    {listParticipants[0]?.name},{' '}
                                                    {listParticipants[1]?.name} +{' '}
                                                    {listParticipants.length - 2} are participating
                                                    in this meeting
                                                </p>
                                            </div>
                                        )}
                                        {listParticipants?.length <= 2 ? (
                                            listParticipants?.length === 0 && (
                                                <span>Nobody is here</span>
                                            )
                                        ) : (
                                            <div>
                                                <p>
                                                    {listParticipants[0]?.name},{' '}
                                                    {listParticipants[0]?.name} are participating in
                                                    this meeting
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='join-room'>
                                <button onClick={requestJoinRoom}>Join Now</button>
                            </div>
                            <div className='hold-join'>
                                <span>Waiting to join...</span>
                            </div>
                            <div className='reject'>
                                <span>Request has been rejected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    );
};
