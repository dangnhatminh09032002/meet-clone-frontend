import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import HailIcon from '@mui/icons-material/Hail';
import moment from "moment";
import { VideoPresets, Room, RoomEvent } from "livekit-client";
import { DisplayContext, LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import "./roompage.css";
import FrameChat from "../../containers/app/frameChat";
import FrameShowUsers from "../../containers/app/frameShowUsers";
import FrameInfoRoom from "../../containers/app/frameInfoRoom";
import FrameJoinRoom from "../../containers/app/frameJoinRoom";
import axios from "axios";
import { ReactNotifications } from "react-notifications-component";
import server from '../../configs/axios-config';

export function RoomPage() {
    const navigate = useNavigate();
    const { room_id = "" } = useParams();
    const [room, setRoom] = useState<any>('');
    const [showChat, setShowChat] = useState(true);
    const [showUsers, setShowUsers] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [hourAndMinute, setHourAndMinute] = useState<any>("");
    const [numParticipants, setNumParticipants] = useState<any>(0);
    const [type, setType] = useState<any>("chat");
    const [token, setToken] = useState<any>(null);
    const [numberPrejoin, setNumberPerjoin] = useState<any>(0);
    
    const displayStyle = {
        display: "block",
    };

    const displayNoneStyle = {
        display: "none",
    };

    const updateParticipantSize = (room: Room) => {
        setNumParticipants(room.participants.size + 1);
    };

    const onParticipantDisconnected = (room: Room) => {
        updateParticipantSize(room);
    };

    const onLeave = () => {
        navigate({
            pathname: "/home",
        });
    };

    const displayOptions = {
        stageLayout: "grid",
        showStats: false,
    };

    const controlItemActive = {
        color: "#8ab4f8",
    };

    const controlItemNoActive = {
        color: "#fff",
    };

    // get Token
    useEffect(() => {
        const getToken = async () => {
            const res = await server.post(
                `rooms/${room_id}/token`
            );
            setToken(res.data);
        };
        getToken();
    }, []);


    useEffect(() => {
        const realTime = setInterval(() => {
            setHourAndMinute(moment(new Date()).format("LTS"));
        }, 1000);
        return () => clearInterval(realTime);
    }, []);

    async function onConnected(room: Room) {
        setRoom(room);
        await room.localParticipant.setCameraEnabled(true);
        await room.localParticipant.setMicrophoneEnabled(true);
    }

    const clickButtonMessage = () => {
        setType("chat");
        setShowChat(!showChat);
        setShowUsers(false);
        setShowInfo(false);
        setShowJoin(false)
    };

    const clickButtonUser = () => {
        setType("user");
        setShowUsers(!showUsers);
        setShowChat(false);
        setShowInfo(false);
        setShowJoin(false)
    };

    const clickButtonInfo = () => {
        setType("info");
        setShowInfo(!showInfo);
        setShowUsers(false);
        setShowChat(false);
        setShowJoin(false)
    };

    const clickButtonJoin = () => {
        setType('join');
        setShowJoin(!showJoin);
        setShowChat(false);
        setShowInfo(false);
        setShowUsers(false)
    }

    return (
        <div className="glo-page">
            <ReactNotifications />
            <div className="row glo-row glo-video-chat">
                <div className="glo-video ">
                    <DisplayContext.Provider value={displayOptions}>
                        {token &&
                        <LiveKitRoom
                            url={'ws://localhost:7880'}
                            token={token}
                            onConnected={(room) => {
                                onConnected(room)
                                room.on(RoomEvent.ParticipantConnected, () => updateParticipantSize(room))
                                room.on(RoomEvent.ParticipantDisconnected, () => onParticipantDisconnected(room))
                                updateParticipantSize(room);   
                            }}
                            connectOptions={{
                                adaptiveStream: true,
                                dynacast: true,
                                videoCaptureDefaults: {
                                    resolution: VideoPresets.hd.resolution,
                                },
                                publishDefaults: {
                                    videoEncoding: VideoPresets.hd.encoding,
                                    simulcast: true,
                                },
                                logLevel: "debug",
                            }}
                            onLeave={onLeave}
                        />
                        }
                    </DisplayContext.Provider>
                    <div className="frameControlLeft">
                        <p>{hourAndMinute} | {room_id}</p>
                    </div>
                </div>
            </div>

            <div className="rightRoom">
                <div className="containerFrame">
                    <div
                        className="wrapJoin" 
                        style={
                            type === "join" && showJoin
                                ? displayStyle
                                : displayNoneStyle
                        }
                    >
                        <FrameJoinRoom
                            setNumberPerjoin= {setNumberPerjoin} 
                            room={room}
                            room_id={room_id}
                        />
                    </div>

                    <div
                        className="wrapChat"
                        style={
                            type === "chat" && showChat
                                ? displayStyle
                                : displayNoneStyle
                        }
                    >
                        <div className="glo-checkChat">
                            <FrameChat
                                room={room}
                                hourAndMinute={hourAndMinute}
                            />
                        </div>
                    </div>

                    
                    <div
                        className="wrapUser"
                        style={
                            type === "user" && showUsers
                                ? displayStyle
                                : displayNoneStyle
                        }
                    >
                        <FrameShowUsers />
                    </div>

                    <div
                        className="wrapInfo"
                        style={
                            type === "info" && showInfo
                                ? displayStyle
                                : displayNoneStyle
                        }
                    >
                        <FrameInfoRoom />
                    </div>

                </div>
                <div className="frameControlRight">
                    <div className="controlItem" onClick={clickButtonJoin}>
                        <HailIcon
                            style={
                                type === "join"
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                            className="controlItem"
                        />
                        <span className="controlNumberJoin">
                            {numberPrejoin}
                        </span>
                    </div>
                    <div className="controlItem" onClick={clickButtonInfo}>
                        <InfoIcon
                            style={
                                type === "info"
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                        />
                    </div>
                    <div className="controlItem" onClick={clickButtonUser}>
                        <GroupIcon
                            style={
                                type === "user"
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                        />
                        <span className="controlNumberCount">
                            {numParticipants}
                        </span>
                    </div>
                    <div className="controlItem" onClick={clickButtonMessage}>
                        <ChatBubbleIcon
                            style={
                                type === "chat"
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                            className="controlItem"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}