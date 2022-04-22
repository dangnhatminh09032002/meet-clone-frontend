import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import HailIcon from "@mui/icons-material/Hail";
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
import { ReactNotifications } from "react-notifications-component";
import { server } from "../../configs/axios-config";

export function RoomPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { room_id = "" } = useParams();
    const [room, setRoom] = useState<any>(null);
    const [roomData, setRoomData] = useState<any>({});
    const [showChat, setShowChat] = useState<boolean>(true);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [showJoin, setShowJoin] = useState<boolean>(false);
    const [iconNotify, setIconNotify] = useState<boolean>(false);
    const [hourAndMinute, setHourAndMinute] = useState<any>("");
    const [numParticipants, setNumParticipants] = useState<any>(0);
    const [type, setType] = useState<any>("chat");
    const [token, setToken] = useState<any>(null);
    const [isHost, setIsHost] = useState<boolean>(false);
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
            pathname: `/stoproom/${room_id}`,
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
        server
            .get(`rooms/${room_id}`)
            .then(async (res) => {
                console.log(res);
                if (!res.data.is_master && !res.data.is_participant) {
                    await navigate({ pathname: `/prejoinroom/${room_id}` });
                }
                await setRoomData(res.data);
                await setLoading(false);
            })
            .catch((err) => {
                navigate({ pathname: "/home" });
            });
    }, []);

    // get Token
    useEffect(() => {
        const getToken = async () => {
            const res = await server.post(`rooms/${room_id}/token`);
            setToken(res.data);
        };
        if (!loading) {
            getToken();
        }
    }, [room_id, loading]);

    // check host
    useEffect(() => {
        const isHost = async () => {
            await server.get(`rooms/${room_id}`).then((res) => {
                if (res.data.is_master) {
                    setIsHost(res.data.is_master);
                } else {
                    setIsHost(false);
                }
            });
        };
        isHost();
    }, [loading]);

    // get Time
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
        setShowJoin(false);
    };

    const clickButtonUser = () => {
        setType("user");
        setShowUsers(!showUsers);
        setShowChat(false);
        setShowInfo(false);
        setShowJoin(false);
    };

    const clickButtonInfo = () => {
        setType("info");
        setShowInfo(!showInfo);
        setShowUsers(false);
        setShowChat(false);
        setShowJoin(false);
    };

    const clickButtonJoin = () => {
        setType("join");
        setShowJoin(!showJoin);
        setShowChat(false);
        setShowInfo(false);
        setShowUsers(false);
    };

    if (loading) return <></>;

    return (
        <div className="glo-page">
            <ReactNotifications />
            <div className="row glo-row glo-video-chat">
                <div className="glo-video ">
                    <DisplayContext.Provider value={displayOptions}>
                        {token && (
                            <LiveKitRoom
                                url={"ws://localhost:7880"}
                                token={token}
                                onConnected={(room) => {
                                    onConnected(room);
                                    room.on(
                                        RoomEvent.ParticipantConnected,
                                        () => updateParticipantSize(room)
                                    );
                                    room.on(
                                        RoomEvent.ParticipantDisconnected,
                                        () => onParticipantDisconnected(room)
                                    );
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
                        )}
                    </DisplayContext.Provider>
                    <div className="frameControlLeft">
                        <p>
                            {hourAndMinute} | {room_id}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rightRoom">
                <div className="containerFrame">
                    {isHost && (
                        <div
                            className="wrapJoin"
                            style={
                                type === "join" && showJoin
                                    ? displayStyle
                                    : displayNoneStyle
                            }
                        >
                            <FrameJoinRoom
                                setShowJoin={setShowJoin}
                                setNumberPerjoin={setNumberPerjoin}
                                room={room}
                                room_id={room_id}
                            />
                        </div>
                    )}
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
                                type={type}
                                room={room}
                                hourAndMinute={hourAndMinute}
                                setShowChat={setShowChat}
                                setIconNotify={setIconNotify}
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
                        <FrameShowUsers
                            setShowUsers={setShowUsers}
                            room_id={room_id}
                            room={room}
                            numParticipants={numParticipants}
                            isHost={isHost}
                            roomData={roomData}
                        />
                    </div>

                    <div
                        className="wrapInfo"
                        style={
                            type === "info" && showInfo
                                ? displayStyle
                                : displayNoneStyle
                        }
                    >
                        <FrameInfoRoom setShowInfo={setShowInfo} />
                    </div>
                </div>
                <div className="frameControlRight">
                    {isHost && (
                        <div
                            className="controlItem"
                            style={{ right: "16px" }}
                            onClick={clickButtonJoin}
                        >
                            <HailIcon
                                style={
                                    type === "join" && showJoin
                                        ? controlItemActive
                                        : controlItemNoActive
                                }
                                className="controlItem"
                            />
                            <span className="controlNumberJoin">
                                {numberPrejoin}
                            </span>
                        </div>
                    )}
                    <div className="controlItem" onClick={clickButtonInfo}>
                        <InfoIcon
                            style={
                                type === "info" && showInfo
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                        />
                    </div>
                    <div className="controlItem" onClick={clickButtonUser}>
                        <GroupIcon
                            style={
                                type === "user" && showUsers
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                        />
                        <span
                            className="controlNumberCount"
                            style={{ right: !isHost ? "173px" : "" }}
                        >
                            {numParticipants}
                        </span>
                    </div>
                    <div className="controlItem" onClick={clickButtonMessage}>
                        <ChatOutlinedIcon
                            style={
                                type === "chat" && showChat
                                    ? controlItemActive
                                    : controlItemNoActive
                            }
                            className="controlItem"
                        />
                        {iconNotify &&(
                            <div className="controlNumberChat"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
