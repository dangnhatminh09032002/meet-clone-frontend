import { faKeyboard, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popover from "@mui/material/Popover";
import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/HomeHeader/HomeHeader";
import { TableRoom } from "../../components/TableRoom/TableRoom";
import { server } from '../../configs/axios-config';
import { AuthContext } from "../../contexts/auth/authProvider";
import { GlobalContext } from "./../../contexts/provider";
import DialogMeet from "./DialogMeet";
import "./homepage.css";

export const textModel = {
    titleH1: 'Premium video meetings. Now free for everyone.',
    titlep: 'Unicorn for you, We re here to help you connect, communicate, and express your ideas so you can get more done together.',
    btnNewMeeting: 'New Meeting',
    btnCreateMeetingLater: 'Create a meeting to use later',
    btnCreateMeetingSchedule: 'Create a meeting schedule',
    btnJoin: 'Join',
    aHelpText: 'Learn more ',
    aHelpTextAbout: 'about Unicorn',
    imgContent:
        'https://res.cloudinary.com/boo-it/image/upload/v1648690218/test/fgvvdhwkoowj5xcdqqzt.png',
};

export const textPlaceholder = {
    inputEnterCodeOrLink: 'Enter a code...',
};

export const testId = {
    titleH1: 'title-h1',
    titlep: 'title-p',
    btnNewMeeting: 'btn-new-meeting',
    btnCreateMeetingLater: 'btn-create-meeting-later',
    btnCreateMeetingSchedule: 'btn-create-meeting-schedule',
    inputEnterCode: 'input-enter-code',
    btnJoin: 'btn-join',
    aHelpText: 'help-text',
    aHelpTextAbout: 'help-text-about',
    imgContent: 'img-content',
    popoverCreate: 'popover-create',
};

export const myError = {
    error: {
        worng: 'Code or link is not correct, please re-enter',
    },
};

export function HomePage() {
    const [room_name, setRoomName] = useState('');
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [openDialogMeet, setOpenDialogMeet] = React.useState(false);
    const open = Boolean(anchorEl);
    const homeProvider = useContext<any>(GlobalContext);
    const { authDetailState } = homeProvider;
    const authProvider = useContext<any>(AuthContext);
    const { signInWithGoogle } = authProvider;

    const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onKeyDownCodeOrLink = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter') {
            joinRoomURL();
        }
    };

    const [textErrorWorng, setTextErrorWorng] = useState(false);


    const joinRoomURL = async () => {
        await server()
            .get(`rooms/${room_name}`)
            .then((res) => {
                if (res.data.is_master) {
                    navigate('/room/' + room_name);
                } else {
                    navigate('/prejoinroom/' + room_name);
                }
            })
            .catch(() => {
                setTextErrorWorng(true);
                setTimeout(() => {
                    setTextErrorWorng(false);
                }, 5000);
            });
    };

    const hanleJoin = async () => {
        signInWithGoogle();
    };

    const createMeetingSchedule = async () => {
        navigate('/schedule');
    };

    return (
        <div className='home-page'>
            <Header />
            <div className='body'>
                <div className='left-side'>
                    <div className='content'>
                        <h1 data-testid={testId.titleH1}>{textModel.titleH1}</h1>
                        <p data-testid={testId.titlep}>{textModel.titlep}</p>
                        <div className='action-btn'>
                            {authDetailState?.payload?.isLogin === true ? (
                                <button
                                    className='btn green'
                                    onClick={handleClickPopover}
                                    data-testid={testId.btnNewMeeting}
                                >
                                    <FontAwesomeIcon className='icon-block' icon={faVideo} />
                                    {textModel.btnNewMeeting}
                                </button>
                            ) : (
                                <button
                                    className='btn green'
                                    onClick={signInWithGoogle}
                                    data-testid={testId.btnNewMeeting}
                                >
                                    <FontAwesomeIcon className='icon-block' icon={faVideo} />
                                    {textModel.btnNewMeeting}
                                </button>
                            )}

                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                data-testid={testId.popoverCreate}
                            >
                                <div className='btn-meeting'>
                                    <button
                                        className='btn-conversations'
                                        onClick={() => {
                                            setOpenDialogMeet(true);
                                        }}
                                        data-testid={testId.btnCreateMeetingLater}
                                    >
                                        {textModel.btnCreateMeetingLater}
                                    </button>
                                    <br></br>
                                    <button
                                        className='btn-conversations'
                                        onClick={createMeetingSchedule}
                                        data-testid={testId.btnCreateMeetingSchedule}
                                        disabled
                                    >
                                        {textModel.btnCreateMeetingSchedule}
                                    </button>
                                    <DialogMeet
                                        openDialogMeet={openDialogMeet}
                                        setOpenDialogMeet={setOpenDialogMeet}
                                        setAnchor={setAnchorEl}
                                    />
                                </div>
                            </Popover>
                            <div className='input-block'>
                                <div className='input-section'>
                                    <FontAwesomeIcon className='icon-block' icon={faKeyboard} />
                                    <input
                                        placeholder={textPlaceholder.inputEnterCodeOrLink}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        onKeyDown={onKeyDownCodeOrLink}
                                        data-testid={testId.inputEnterCode}
                                    />
                                </div>
                                {authDetailState?.payload?.isLogin === true ? (
                                    <button
                                        className='btn no-bg btn-join'
                                        onClick={() => joinRoomURL()}
                                        data-testid={testId.btnJoin}
                                    >
                                        {textModel.btnJoin}
                                    </button>
                                ) : (
                                    <button
                                        className='btn no-bg btn-join'
                                        onClick={() => hanleJoin()}
                                        data-testid={testId.btnJoin}
                                    >
                                        {textModel.btnJoin}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='glo-notify'>
                            {textErrorWorng && 
                            <p className='text-notice'>{myError.error.worng}</p>}
                        </div>
                    </div>
                    <div className='help-text'>
                        <a href='##' data-testid={testId.aHelpText}>
                            {textModel.aHelpText}
                        </a>
                        about Unicorn
                    </div>
                    <TableRoom />
                </div>
                <div className='right-side'>
                    <div className='content'>
                        <img src={textModel.imgContent} alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
}
