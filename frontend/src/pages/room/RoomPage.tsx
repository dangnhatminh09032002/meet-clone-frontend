import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-chat-widget/lib/styles.css";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import moment from "moment";
import { VideoPresets, Room, RoomEvent } from "livekit-client";
import { ControlsProps, DisplayContext, LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import "./roompage.css";
import FrameChat from "../../containers/app/frameChat";
import FrameShowUsers from "../../containers/app/frameShowUsers";
import FrameInfoRoom from "../../containers/app/frameInfoRoom";
import FrameJoinRoom from "../../containers/app/frameJoinRoom";
import { ReactNotifications } from "react-notifications-component";
import { server } from "../../configs/axios-config";
import { Badge, Grid, IconButton, Typography } from "@mui/material";

export function RoomPage() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { room_id = "" } = useParams();
    const [room, setRoom] = useState<any>(null);
    const [roomData, setRoomData] = useState<any>({});
    const [showChat, setShowChat] = useState<boolean>(false);
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
    const [audio, setAudio] = useState(true);
    const [camera, setCamera] = useState(true);
    const [share, setShare] = useState(true);

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

    const positionRight = () => {
        let widthOwl = document.querySelectorAll("._2HbZ0");
        for (let index = 0; index < widthOwl.length; index++) {
            const widthOwlCarousel = widthOwl[index];
            console.log(widthOwlCarousel.clientWidth);
            if (widthOwlCarousel.clientWidth <= 1520) {
                document
                    .querySelector("._2HbZ0")
                    ?.setAttribute("style", "width:100%");
            } else {
                document
                    .querySelector("._2HbZ0")
                    ?.setAttribute("style", "width: calc( 100% - 380px)");
            }
        }
    };

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
        positionRight();
    };

    const clickButtonUser = () => {
        setType("user");
        setShowUsers(!showUsers);
        setShowChat(false);
        setShowInfo(false);
        setShowJoin(false);
        positionRight();
    };

    const clickButtonInfo = () => {
        setType("info");
        setShowInfo(!showInfo);
        setShowUsers(false);
        setShowChat(false);
        setShowJoin(false);
        positionRight();
    };

    const clickButtonJoin = () => {
        setType("join");
        setShowJoin(!showJoin);
        setShowChat(false);
        setShowInfo(false);
        setShowUsers(false);
        positionRight();
    };

    const handleMic = () => {
        if (audio === true) {
            setAudio(false);
            room.localParticipant.setMicrophoneEnabled(false);
        } else {
            setAudio(true);
            room.localParticipant.setMicrophoneEnabled(true);
        }
    };

    const handleCamera = () => {
        if (camera === true) {
            setCamera(false);
            room.localParticipant.setCameraEnabled(false);
        } else {
            setCamera(true);
            room.localParticipant.setCameraEnabled(true);
        }
    };

    const handleShare = () => {
        if (share === true) {
            setShare(false);
            room.localParticipant.setScreenShareEnabled(false);
        } else {
            setShare(true);
            room.localParticipant.setScreenShareEnabled(true);
        }
    };

    if (loading) return <></>;

    return (
        <div className="glo-page">
            <ReactNotifications />
            <div className="row glo-row glo-video-chat">
                <div className="glo-video">
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
                                controlRenderer={(props: ControlsProps) => {
                                    return (
                                        <div className="frame-bottom">
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <div className="infor-room">
                                                        <Typography>
                                                            {hourAndMinute} |{" "}
                                                            {room_id}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <div className="control-video">
                                                        <div className="show-mic">
                                                            {audio ? (
                                                                <div
                                                                    className="btn-micro-on"
                                                                    onClick={() =>
                                                                        handleMic()
                                                                    }
                                                                >
                                                                    <i className="bx bx-microphone icon-mic"></i>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="btn-micro-off"
                                                                    onClick={() =>
                                                                        handleMic()
                                                                    }
                                                                >
                                                                    <i className="bx bx-microphone-off icon-mic"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="show-camera"
                                                            onClick={() =>
                                                                handleCamera()
                                                            }
                                                        >
                                                            {camera ? (
                                                                <div className="btn-camera-on">
                                                                    <i className="bx bx-camera icon-mic"></i>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="btn-camera-off"
                                                                    onClick={() =>
                                                                        handleCamera()
                                                                    }
                                                                >
                                                                    <i className="bx bx-camera-off icon-mic"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="show-share"
                                                            onClick={() =>
                                                                handleShare()
                                                            }
                                                        >
                                                            <div className="btn-share">
                                                                <i className="bx bx-export icon-mic"></i>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="show-end"
                                                            onClick={() =>
                                                                onLeave()
                                                            }
                                                        >
                                                            <div className="btn-end">
                                                                <i className="bx bxs-phone icon-end"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}></Grid>
                                            </Grid>
                                        </div>
                                    );
                                }}
                            />
                        )}
                    </DisplayContext.Provider>
                </div>
            </div>
            <div className="wrap-side">
                <div className="sideBarPage">
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
                    </div>
                </div>
                <div className="frameControlRight">
                    {isHost && (
                        <div className="controlItem" onClick={clickButtonJoin}>
                            <IconButton aria-label="join room">
                                <Badge
                                    badgeContent={numberPrejoin}
                                    color="primary"
                                >
                                    <PersonAddIcon
                                        style={
                                            type === "join" && showJoin
                                                ? controlItemActive
                                                : controlItemNoActive
                                        }
                                        className="controlItemIcon"
                                    />
                                </Badge>
                            </IconButton>
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
                        <IconButton aria-label="join room">
                            <Badge
                                badgeContent={numParticipants}
                                color="primary"
                            >
                                <GroupIcon
                                    style={
                                        type === "user" && showUsers
                                            ? controlItemActive
                                            : controlItemNoActive
                                    }
                                />
                            </Badge>
                        </IconButton>
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
                        {iconNotify && (
                            <div className="controlNumberChat"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
