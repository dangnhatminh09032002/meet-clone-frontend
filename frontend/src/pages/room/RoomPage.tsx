import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { Room, RoomEvent, VideoPresets } from "livekit-client";
import { DisplayContext, LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-aspect-ratio/aspect-ratio.css";
import "react-chat-widget/lib/styles.css";
import { ReactNotifications } from "react-notifications-component";
import { useNavigate, useParams } from "react-router-dom";
import FrameChat from "../../containers/app/frameChat";
import FrameInfoRoom from "../../containers/app/frameInfoRoom";
import FrameShowUsers from "../../containers/app/frameShowUsers";
import "./roompage.css";

export function RoomPage() {
    const navigate = useNavigate();
    const { room_id = "" } = useParams();
    const [room, setRoom] = useState<any>();
    const [showChat, setShowChat] = useState(true);
    const [showUsers, setShowUsers] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [hourAndMinute, setHourAndMinute] = useState<any>("");
    const [numParticipants, setNumParticipants] = useState<any>(0);
    const [type, setType] = useState<any>("chat");
    const [token, setToken] = useState<any>(null);

    const displayStyle = {
        display: "block",
    };

    const displayNoneStyle = {
        display: "none",
    };

    const updateParticipantSize = (room: Room) => {
        // console.log("so luong:" , room.participants.size + 1);
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
        const getToken = async () => {
            const res = await axios.get(
                `http://localhost:8080/api/room/get-token/${room_id}`,
                { withCredentials: true }
            );
            setToken(res.data.data);
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
        console.log(room);
        await room.localParticipant.setCameraEnabled(true)
        await room.localParticipant.setMicrophoneEnabled(true)

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
                        {token &&
                            <LiveKitRoom
                                url={'ws://localhost:7880'}
                                token={token}
                                // key={uuidv1()}
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
