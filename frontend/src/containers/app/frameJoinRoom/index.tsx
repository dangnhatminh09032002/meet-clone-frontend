import CloseIcon from "@mui/icons-material/Close";
import "./frameJoinRoom.css";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { RoomEvent } from "livekit-client";
import axios from "axios";

function FrameJoinRoom(props: any) {
    const [infoJoinRoom, setInfoJoinRoom] = useState<any>([]);
    const room = props.room;
    const room_id = props.room_id;
    const setNumberPerjoin = props.setNumberPerjoin
    
    useEffect(() => {
        setNumberPerjoin(infoJoinRoom.length);
    },[infoJoinRoom.length])

    useEffect(() => {
        const receivedDataJoin = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                const strData2 = decoder.decode(payload);
                const data = JSON.parse(strData2);
                if (data.type === 'room'){
                    setInfoJoinRoom((prev: any) => [...prev, data]);
                } 
            });
        };
        room && receivedDataJoin();
    }, [room]);
    

    const handleAllow = async (participant_id: any) => {
        console.log(room_id)
        const data = {
            roomName: room_id,
            participantId: participant_id,
            isAllow: true
        }
        const res = await axios.post('http://localhost:8080/api/room/res-join-room', data,  { withCredentials: true });
        console.log(res)
    }

    const handleDeny = async (participant_id: any) => {
        const data = {
            roomName: room_id,
            participantId: participant_id,
            isAllow: false
        }
        const res = await axios.post('http://localhost:8080/api/room/res-join-room', data, { withCredentials: true })
        console.log(res)
    }

    return (
        <div className="frameJoinRoom">
            <div className="headerFrameUser">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Waiting Room</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip">
                        <CloseIcon />
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>
            </div>

            <div className="listJoin">
                {infoJoinRoom.map((user: any, index: any) => (
                    <div className="infoUsersJoin" key={index}>
                        <div className="avatarUser">
                            <img src={user.data.data.picture} referrerPolicy='no-referrer' alt="Avatar"/>
                        </div>

                        <div className="bodyInfo">
                            <div className="nameUser">{user.data.data.participant_name}</div>
                        </div>

                    <div className="infoIcon">
                            <div className="infoIconDelete">
                                <DeleteIcon  onClick={() => handleDeny(user.data.data.participant_id)}/>
                            </div>
                            <div className="infoIconAllow">
                                <DoneIcon  onClick={() => handleAllow(user.data.data.participant_id)}/>
                            </div>      
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FrameJoinRoom;
