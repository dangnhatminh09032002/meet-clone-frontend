import CloseIcon from '@mui/icons-material/Close';
import './frameJoinRoom.css'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { DataPacket_Kind, Participant, RoomEvent } from 'livekit-client';

function FrameJoinRoom(props: any) {
    const [infoJoinRoom, setInfoJoinRoom] = useState<any>([]);
    const room = props.room;
    console.log(infoJoinRoom);

    useEffect(() => {
        const receivedDataJoin = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                console.log('matching.......');
                const strData = decoder.decode(payload);
                setInfoJoinRoom(JSON.parse(strData));
            })
        }
        room && receivedDataJoin()
    }, [room])

    return (
        <div className="frameJoinRoom">
            <div className="headerFrameUser">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Waiting Room</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip">
                        <CloseIcon/>
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>
            </div>

            <div className="listJoin">
                <div className="infoUsersJoin">
                    <div className="avatarUser">
                        <img src="https://lh3.googleusercontent.com/a/AATXAJy-qB8gB7EjKkXwPV7WWfUHmg3ZHBb2SWw9rN_IMA=s192-c-mo" />
                    </div>

                    <div className="bodyInfo">
                        <div className="nameUser">Lê Văn Duy</div>
                    </div>

                    <div className="infoIcon">
                        <div className="infoIconDelete">
                            <DeleteIcon />  
                        </div>
                        <div className="infoIconAllow">
                            <DoneIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrameJoinRoom;