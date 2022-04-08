import React, { useState, useEffect, useRef } from 'react';
import './frameChat.css';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
    RoomEvent,
    DataPacket_Kind,
    Participant
} from 'livekit-client';

function FrameChat(props: any) {
    const [message, setMessage] = useState<any>(null);
    const [listMessage, setListMessage] = useState<any>([]);
    const room = props.room;
    console.log(room);
    const { hourAndMinute, clickButtonMessage } = props;
    const inputRef = useRef<any>();
    const classActiveIcon = message ? 'iconActive' : '';

    const handleSendMessage = () => {
        const dataSend = {
            userIdentity: room.localParticipant.participantInfo.identity,
            timeSpan: hourAndMinute,
            inputMessage: message
        };
        setListMessage([...listMessage, dataSend]);
        const strData = JSON.stringify([...listMessage, dataSend]);
        const encoder = new TextEncoder();
        const data = encoder.encode(strData);
        room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);

        setMessage('');
        inputRef.current.focus();
    };

    useEffect(() => {
        const test = () => {
            const decoder = new TextDecoder();
            room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
                const strData = decoder.decode(payload);
                setListMessage(JSON.parse(strData));
            });
        };
        if (room) {
            test();
        }
    }, [room]);

    return (
        <div className="frameChat">
            <div className="headerFrameChat">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Message in call</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip">
                        <CloseIcon onClick={() => clickButtonMessage()} />
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>
            </div>


            <div className="acceptMessage">
                <div className="isAllow">Allow people to message</div>
                <div className="acceptButton"> accept</div>
            </div>

            <div className="notificationChat">
                The message will only be visible to the call participants and will be deleted when the call ends.
            </div>

            <div className="bodyFrameChat">
                {
                    listMessage.map((infoMessage: any, index: any) => (

                        <div className="rowChat" key={index}>
                            <div className="headerRowChat">
                                <div className="nameRowChat">{(room.localParticipant.participantInfo.identity === infoMessage.userIdentity) ? 'You' : infoMessage.userIdentity}</div>
                                <div className="timeRowChat">{infoMessage.timeSpan}</div>
                            </div>
                            <div className="inputMessage">
                                {infoMessage.inputMessage}
                            </div>
                        </div>
                    ))
                }
            </div>


            <div className="footerFrameChat">
                <div className="formSendMessage">
                    <div className="footerInputChat">
                        <input
                            ref={inputRef}
                            value={message || ''}
                            placeholder="Send message for everybody"
                            onChange={e => setMessage(e.target.value)}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    handleSendMessage();
                                }
                            }}
                        />
                    </div>
                    <div className={`footerChatIconSend ${classActiveIcon}`} >
                        <SendIcon onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrameChat;