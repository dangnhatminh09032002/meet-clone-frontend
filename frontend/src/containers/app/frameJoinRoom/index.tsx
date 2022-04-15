import CloseIcon from "@mui/icons-material/Close";
import "./frameJoinRoom.css";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { RoomEvent } from "livekit-client";
import server from "../../../configs/axios-config";

function FrameJoinRoom(props: any) {
    const [infoJoinRoom, setInfoJoinRoom] = useState<any>([]);
    const room = props.room;
    const room_id = props.room_id;
    const setNumberPerjoin = props.setNumberPerjoin
    // console.log(infoJoinRoom.map((e: any) => console.log(e.payload.data.participant_id)));
    console.log(infoJoinRoom)

    useEffect(() => {
        setNumberPerjoin(infoJoinRoom.length);
    },[infoJoinRoom.length])

    useEffect(() => {
        const receivedDataJoin = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                const strData2 = decoder.decode(payload);
                const data = JSON.parse(strData2);
                console.log(data);
                // console.log(infoJoinRoom.some((e: any) => e.payload.data.participant_id === data.payload.data.participant_id));
                // console.log('infoJoinRoom: ', infoJoinRoom?.map((e: any) => e.payload.data.participant_id));
                // console.log('data: ', data.payload.data.participant_id)
                if (data.type === 'room' ){
                    setInfoJoinRoom((prev: any) => [...prev, data]);  
                } 
            });
        };
        room && receivedDataJoin();
    }, [room]);
    

    const handleAllow = async (participant_id: any) => {
        const res = await server.get(`rooms/${room_id}/res-join-room?participant_id=${participant_id}&is_allow=${true}`);
        console.log(res)
    }

    const handleDeny = async (participant_id: any) => {
        const res = await server.get(`rooms/${room_id}/res-join-room?participant_id=${participant_id}&is_allow=${false}`);
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
                            <img src={user?.payload?.data?.participant_picture} referrerPolicy='no-referrer' alt="Avatar"/>
                        </div>

                        <div className="bodyInfo">
                            <div className="nameUser">{user?.payload?.data?.participant_name}</div>
                        </div>

                    <div className="infoIcon">
                            <div className="infoIconDelete">
                                <DeleteIcon  onClick={() => handleDeny(user.payload.data.participant_id)}/>
                            </div>
                            <div className="infoIconAllow">
                                <DoneIcon  onClick={() => handleAllow(user.payload.data.participant_id)}/>
                            </div>      
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FrameJoinRoom;
