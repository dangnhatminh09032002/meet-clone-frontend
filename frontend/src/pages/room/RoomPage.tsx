import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import FrameChat from "../../containers/app/frameChat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import { VideoPresets, Room, RoomEvent } from "livekit-client";
import { DisplayContext, LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import "./roompage.css";
import FrameShowUsers from "../../containers/app/frameShowUsers";
import FrameInfoRoom from "../../containers/app/frameInfoRoom";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";
import { ReactNotifications } from "react-notifications-component";

export function RoomPage() {
    const navigate = useNavigate();
    const { roomName = "" } = useParams();
    const [room, setRoom] = useState<any>();
    const [showChat, setShowChat] = useState(true);
    const [showUsers, setShowUsers] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [hourAndMinute, setHourAndMinute] = useState<any>("");
    const [numParticipants, setNumParticipants] = useState<any>(0);
    const [type, setType] = useState<any>("chat");
    const [token, setToken] = useState<any>(null);
    const location = useLocation();

    console.log(roomName);
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

    useEffect(() => {
        const realTime = setInterval(() => {
            setHourAndMinute(moment(new Date()).format("LTS"));
        }, 1000);
        return () => clearInterval(realTime);
    }, []);

    // useEffect(() => {
    //     const getToken = async () => {
    //         const room_id = roomName;
    //         const res = await axios.get(
    //             `http://localhost:8080/api/room/get-token/${room_id}`,
    //             { withCredentials: true }
    //         );
    //         setToken(res.data.data);
    //     };
    //     getToken();
    // }, []);

    async function onConnected(room: any) {
        setRoom(room);
        await room.localParticipant.enableCameraAndMicrophone(true);
        // await room.on(RoomEvent.ParticipantConnected, () =>
        //     updateParticipantSize(room)
        // );
        // await room.on(RoomEvent.ParticipantDisconnected, () =>
        //     onParticipantDisconnected(room)
        // );
        // updateParticipantSize(room);
    }

    const clickButtonMessage = () => {
        setType("chat");
        setShowChat(!showChat);
        setShowUsers(false);
        setShowInfo(false);
    };

    const clickButtonUser = () => {
        setType("user");
        setShowUsers(!showUsers);
        setShowChat(false);
        setShowInfo(false);
    };

    const clickButtonInfo = () => {
        setType("info");
        setShowInfo(!showInfo);
        setShowUsers(false);
        setShowChat(false);
    };

    return (
        <div className="glo-page">
            <ReactNotifications />
            <div className="row glo-row glo-video-chat">
                <div className="glo-video">
                    <DisplayContext.Provider value={displayOptions}>
                        <LiveKitRoom
                            url={'ws://localhost:7880'}
                            token={roomName}
                            key={uuidv1()}
                            onConnected={(room) => {
                                return onConnected(room);
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
                    </DisplayContext.Provider>
                    <div className="frameControlLeft">
                        <p>{hourAndMinute} | roomName</p>
                    </div>
                </div>
            </div>

            <div className="rightRoom">
                <div className="containerFrame">
                    {type === "chat" && showChat && (
                        <div
                            className="wrapChat"
                            style={
                                type === "chat"
                                    ? displayStyle
                                    : displayNoneStyle
                            }
                        >
                            <div className="glo-checkChat">
                                <FrameChat
                                    room={room}
                                    hourAndMinute={hourAndMinute}
                                    showChat={showChat}
                                />
                            </div>
                        </div>
                    )}

                    {type === "user" && showUsers && (
                        <div
                            className="wrapUser"
                            style={
                                type === "user"
                                    ? displayStyle
                                    : displayNoneStyle
                            }
                        >
                            <FrameShowUsers />
                        </div>
                    )}

                    {type === "info" && showInfo && (
                        <div
                            className="wrapInfo"
                            style={
                                type === "info"
                                    ? displayStyle
                                    : displayNoneStyle
                            }
                        >
                            <FrameInfoRoom />
                        </div>
                    )}
                </div>
                <div className="frameControlRight">
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