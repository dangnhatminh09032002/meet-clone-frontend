import { createLocalVideoTrack, LocalVideoTrack, Room, RoomEvent } from 'livekit-client';
import { AudioSelectButton, VideoRenderer, VideoSelectButton } from 'livekit-react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/HomeHeader/HomeHeader';
import { server } from '../../configs/axios-config';
import './prejoinpage.css';

const room = new Room({
    adaptiveStream: true,
    dynacast: true,
});

export const modelPrejoinroom = {
    textSpanCamera1: 'Camera is enabled',
    textSpanCamera2: 'Camera is disabled',
    textSpanMic1: 'Mic is enabled',
    textSpanMic2: 'Mic is disabled',
    textSpanReady: 'Ready to join',
    textSpanWaitting: 'Waiting to join...',
    textSpanReject: 'Request has been rejected',
    btnJoin: 'Join Now',
};

export const testIdPrejoinroom = {
    textSpanCamera1: 'text-span-camera-1',
    textSpanCamera2: 'text-span-camera-2',
    textSpanMic1: 'text-span-mic-1',
    textSpanMic2: 'text-span-mic-2',
    textSpanReady: 'text-span-ready',
    textSpanWaitting: 'text-span-waitting',
    textSpanReject: 'text-span-reject',
    btnJoin: 'btn-join',
};

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

    // Check exist room
    useEffect(() => {
        server()
            .get(`rooms/${room_id}`)
            .then((res) => {
                setLoading(false);
                if (res.data.is_participant) {
                    navigate(`/room/${room_id}`);
                }
            })
            .catch(() => {
                navigate({ pathname: '/home' });
            });
    }, []);

    // Connect server and listen response
    useEffect(() => {
        if (!loading) {
            // setTimeout(() => {
            // }, 1000);
            const fetchToken = async () => {
                const res = await server().post(`rooms/${room_id}/token`);
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
                        result?.payload.data.is_allow === true
                    ) {
                        navigate('/room/' + room_id);
                    } else {
                        document.querySelector('.join-room')?.setAttribute('style', 'display:none');
                        document.querySelector('.hold-join')?.setAttribute('style', 'display:none');
                        document.querySelector('.reject')?.setAttribute('style', 'display:block');
                    }
                });
            };
            fetchToken();
        }
    }, [loading]);

    // Clean up video
    useEffect(() => {
        return () => {
            if (!loading) {
                setVideoEnabled(false);
                setAudioEnabled(false);
                videoTrack?.stop();
            }
        };
    }, [loading, videoTrack]);

    // Set enabled video default
    useEffect(() => {
        if (!loading) {
            createLocalVideoTrack({
                deviceId: videoDevice?.deviceId,
            }).then((track) => {
                setVideoEnabled(true);
                setVideoTrack(track);
            });
        }
    }, [loading, videoDevice]);

    // Show participants in room
    useLayoutEffect(() => {
        const listPaticipant = async () => {
            await server()
                .get(`rooms/${room_id}/participants`)
                .then(async (result) => {
                    await setListPaticipants(result.data);
                });
        };
        listPaticipant();
    }, [room_id]);

    // Request join room
    const requestJoinRoom = async () => {
        await server()
            .get(`rooms/${room_id}/req-join-room`)
            .then(() => {
                document.querySelector('.hold-join')?.setAttribute('style', 'display:block');
            })
            .catch((err) => {
                throw err;
            });
    };

    // On off video
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

    // On off audio
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

    // Select video device options
    const selectVideoDevice = (device: MediaDeviceInfo) => {
        setVideoDevice(device);
        if (videoTrack) {
            if (videoTrack.mediaStreamTrack.getSettings().deviceId === device.deviceId) {
                return;
            }
            videoTrack.stop();
        }
    };

    // Show video element
    let videoElement;
    if (videoTrack) {
        videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
    } else {
        videoElement = <div className='placeholder' />;
    }

    if (loading) return <></>;
    return (
        <div className='prejoin'>
            <main>
                <Header />
                <div className='wapper-content'>
                    <div className='wapper-videoSection'>
                        <div className='videoSection'>
                            {videoEnabled ? (
                                <span
                                    className='text-video'
                                    data-testid={testIdPrejoinroom.textSpanCamera1}
                                >
                                    {modelPrejoinroom.textSpanCamera1}
                                </span>
                            ) : (
                                <span
                                    className='text-video'
                                    data-testid={testIdPrejoinroom.textSpanCamera2}
                                >
                                    {modelPrejoinroom.textSpanCamera2}
                                </span>
                            )}
                            {audioEnabled ? (
                                <span
                                    className='text-audio'
                                    data-testid={testIdPrejoinroom.textSpanMic1}
                                >
                                    {modelPrejoinroom.textSpanMic1}
                                </span>
                            ) : (
                                <span
                                    className='text-audio'
                                    data-testid={testIdPrejoinroom.textSpanMic2}
                                >
                                    {modelPrejoinroom.textSpanMic2}
                                </span>
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
                            <span data-testid={testIdPrejoinroom.textSpanReady}>
                                {modelPrejoinroom.textSpanReady}
                            </span>
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
                                    <div className='show-participants'>
                                        {listParticipants?.length >= 2 && (
                                            <div>
                                                <span>
                                                    {listParticipants[0]?.name} and{' '}
                                                    {listParticipants.length - 1} people are
                                                    participating in this meeting
                                                </span>
                                            </div>
                                        )}
                                        {listParticipants?.length === 1 && (
                                            <div>
                                                {listParticipants[0]?.name} is participating in this
                                                meeting
                                            </div>
                                        )}
                                        {listParticipants?.length === 0 && (
                                            <div>
                                                <span>Nobody is here</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='join-room'>
                                <button
                                    className='btn-join-now'
                                    data-testid={testIdPrejoinroom.btnJoin}
                                    onClick={requestJoinRoom}
                                >
                                    {modelPrejoinroom.btnJoin}
                                </button>
                            </div>
                            <div className='hold-join'>
                                <span data-testid={testIdPrejoinroom.textSpanWaitting}>
                                    {modelPrejoinroom.textSpanWaitting}
                                </span>
                            </div>
                            <div className='reject'>
                                <span data-testid={testIdPrejoinroom.textSpanReject}>
                                    {modelPrejoinroom.textSpanReject}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    );
};
