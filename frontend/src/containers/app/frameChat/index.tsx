import React, { useState, useEffect, useRef } from "react";
import "./frameChat.css";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { RoomEvent, DataPacket_Kind } from "livekit-client";

function FrameChat(props: any) {
    const { hourAndMinute, setShowChat, setType, room, type, setIconNotify } = props;
    const [message, setMessage] = useState<any>(null);
    const [listMessage, setListMessage] = useState<any>([]);
    const inputRef = useRef<any>();
    const classActiveIcon = message ? "iconActive" : "";
    const messageRef = useRef<any>();
    const [isWatching, setIsWatching] = useState<any>(false);

    useEffect(() => {
        if (type !== "chat") {
            setIsWatching(true);
        } else {
            setIsWatching(false);
            setIconNotify(false);
        }
    }, [type]);

    useEffect(() => {
        if (isWatching) {
            setIconNotify(true);
        }
    }, [listMessage]);

    const handleSendMessage = () => {
        const dataSend = {
            type: "chat",
            data: {
                userIdentity: room.localParticipant.participantInfo.identity,
                name: room.localParticipant.name,
                timeSpan: hourAndMinute,
                inputMessage: message,
            },
        };
        if(message){
            setListMessage([...listMessage, dataSend]);
            const strData = JSON.stringify(dataSend);
            const encoder = new TextEncoder();
            const data = encoder.encode(strData);
            room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
        }
        setMessage("");
        inputRef.current.focus();
    };

    useEffect(() => {
        const receivedData = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                const strData = decoder.decode(payload);
                const data = JSON.parse(strData);
                data.type === "chat" && 
                    setListMessage((prev: any) => [...prev, data]);
            });
        };
        room && receivedData();
    }, [room]);

    // scrollIntoView
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, [listMessage.length]);

    return (
        <div className="frameChat">
            <div className="headerFrameChat">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Message in call</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip"onClick={() => setType("")}>
                        <CloseIcon  />
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>
            </div>

            <div className="notificationChat">
                The message will only be visible to the call participants and
                will be deleted when the call ends.
            </div>

            <div className="bodyFrameChat">
                {listMessage.map((infoMessage: any, index: any) => (
                    <div className="rowChat" key={index} ref={messageRef}>
                        <div className="headerRowChat">
                            <div className="nameRowChat">
                                {room.localParticipant.participantInfo
                                    .identity === infoMessage.data.userIdentity
                                    ? "You"
                                    : infoMessage.data.name}
                            </div>
                            <div className="timeRowChat">
                                {infoMessage.data.timeSpan}
                            </div>
                        </div>
                        <div className="inputMessage">
                            {infoMessage.data.inputMessage}
                        </div>
                    </div>
                ))}
            </div>

            <div className="footerFrameChat">
                <div className="formSendMessage">
                    <div className="footerInputChat">
                        <input
                            ref={inputRef}
                            value={message || ""}
                            placeholder="Send message for everybody"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                        />
                    </div>
                    <div className={`footerChatIconSend ${classActiveIcon}`}>
                        <SendIcon onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrameChat;
