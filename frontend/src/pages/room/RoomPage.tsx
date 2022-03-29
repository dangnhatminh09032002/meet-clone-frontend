import React, { useEffect, useState, useContext } from 'react';
// import ChatIcon from '@material-ui/icons/Chat';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { RoomEvent, DataPacket_Kind, Participant } from 'livekit-client';
import { LiveKitRoom } from 'livekit-react';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-chat-widget/lib/styles.css';
import './roompage.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {GlobalContext} from '../../contexts/provider';
import FrameChat from '../../containers/app/frameChat';
import FrameControl from '../../containers/app/frameControl';


export function RoomPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState<any>([]);
    const { roomName = '' } = useParams();
    const [room, setRoom] = useState<any>();
    const globalState = useContext<any>(GlobalContext);

    const { chatDetailState } = globalState;
    console.log(chatDetailState);

    useEffect(() => {
        if (room) {
            // check identity != user sent message => show message
            if (
                room.localParticipant.participantInfo.identity !== message.userIdentity
            ) {
                addResponseMessage(message ? message.inputMessage : '');
            }
        }
    }, [message]);

    useEffect(() => {
        const test = () => {
            const strData = JSON.stringify({ some: 'data' });
            const encoder = new TextEncoder();
            const decoder = new TextDecoder();
            const data = encoder.encode(strData);

            // Revice message
            room.on(
                RoomEvent.DataReceived,
                (
                    payload: Uint8Array,
                    participant: Participant,
                    kind: DataPacket_Kind
                ) => {
                    const strData = decoder.decode(payload);
                    setMessage(JSON.parse(strData));
                }
            );
        };
        if (room) {
            test();
        }
    }, [room]);

    const handleNewUserMessage = (newMessage: any) => {
        // const dataSend = {
        //     userIdentity: room.localParticipant.participantInfo.identity,
        //     timeSpan: new Date(),
        //     inputMessage: newMessage,
        // };
        // setMessage(dataSend);
        // const strData = JSON.stringify(dataSend);
        // const encoder = new TextEncoder();
        // const data = encoder.encode(strData);
        // // send message
        // room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);
    };

    async function onConnected(room: any) {
        setRoom(room);
        await room.localParticipant.enableCameraAndMicrophone(true);
    }

    return (
        <div className="roomPageWrapper">
            <Container maxWidth='xl'>
                <h1>ROOM: {roomName}</h1>{' '}
                <Box>
                    <LiveKitRoom
                        url={'ws://localhost:7880'}
                        token={roomName}
                        onConnected={(room) => {
                            console.log(room);
                            return onConnected(room);
                        }}
                    />
                </Box>
                <Button
                    variant='outlined'
                    onClick={() => {
                        navigate('/');
                    }}
                >
                Leave
                </Button>
            </Container>
            <FrameChat />
            {/* <Widget 
                title="Welcome"
                subtitle="Welcome to the room"
                handleNewUserMessage={handleNewUserMessage}
                emojis
            /> */}
            <FrameControl/>
        </div>
    );
}
