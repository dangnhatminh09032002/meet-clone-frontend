import CloseIcon from '@mui/icons-material/Close';
import './frameJoinRoom.css';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLayoutEffect, useState, memo } from 'react';
import { RoomEvent } from 'livekit-client';
import { server } from '../../../configs/axios-config';
import { Howl, Howler } from 'howler';
// import { useSpeechSynthesis } from 'react-speech-kit';

function FrameJoinRoom(props: any) {
    const [infoJoinRoom, setInfoJoinRoom] = useState<any>([]);
    const { setShowJoin, room, room_id } = props;
    const setNumberPerjoin = props.setNumberPerjoin;
    const [value, setValue] = useState('');
    // const { speak } = useSpeechSynthesis();
    useLayoutEffect(() => {
        setNumberPerjoin(infoJoinRoom.length);
    }, [infoJoinRoom.length]);

    useLayoutEffect(() => {
        const receivedDataJoin = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                const strData2 = decoder.decode(payload);
                const result = JSON.parse(strData2);
                if (result.type === 'room' && result.action === 'req-join-room') {
                    let sound = new Howl({
                        src: [
                            'https://res.cloudinary.com/boo-it/video/upload/v1650609946/test/l2q7zhn9qcsb7hoghnth.mp3',
                        ],
                    });
                    // Clear listener after first call.
                    sound.once('load', function () {
                        sound.play();
                    });
                    // setValue('aaa');
                    setInfoJoinRoom((prev: any) => {
                        const check = prev.some(
                            (user: any) =>
                                user.participant_id === result.payload.data.participant_id
                        );
                        if (!check) prev.push(result.payload.data);
                        return prev;
                    });
                }
                // speak(value);
            });
        };
        room && receivedDataJoin();
    }, [room]);

    const handleResponseJoinRoom = (participant_id: string) => {
        setInfoJoinRoom((prev: any) => {
            return prev.filter((room: any) => room.participant_id !== participant_id);
        });
    };

    const handleAllow = async (participant_id: string) => {
        await server.get(
            `rooms/${room_id}/res-join-room?participant_id=${participant_id}&is_allow=true`
        );
        handleResponseJoinRoom(participant_id);
    };

    const handleDeny = async (participant_id: string) => {
        await server.get(
            `rooms/${room_id}/res-join-room?participant_id=${participant_id}&is_allow=false`
        );
        handleResponseJoinRoom(participant_id);
    };

    return (
        <div className='frameJoinRoom'>
            <div className='headerFrameUser'>
                <div className='headerTitleWrap'>
                    <div className='headerTitle'>Waiting Room</div>
                </div>
                <div className='headerIcon'>
                    <div className='glo-icon-close tooltip'>
                        <CloseIcon onClick={() => setShowJoin(false)} />
                        <span className='tooltiptext'>Close</span>
                    </div>
                </div>
            </div>

            <div className='listJoin'>
                {infoJoinRoom.map((user: any, index: any) => (
                    <div className='infoUsersJoin' key={index}>
                        <div className='avatarUser'>
                            <img
                                src={user.participant_picture}
                                referrerPolicy='no-referrer'
                                alt='Avatar'
                            />
                        </div>

                        <div className='bodyInfo'>
                            <div className='nameUser'>{user.participant_name}</div>
                        </div>

                        <div className='infoIcon'>
                            <div className='infoIconDelete'>
                                <DeleteIcon onClick={() => handleDeny(user.participant_id)} />
                            </div>
                            <div className='infoIconAllow'>
                                <DoneIcon onClick={() => handleAllow(user.participant_id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FrameJoinRoom;
