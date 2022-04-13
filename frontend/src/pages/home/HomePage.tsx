import { faKeyboard, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popover from "@mui/material/Popover";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/HomeHeader/HomeHeader";
import { auth } from "../../configs/firebase-config";
import { authDetailData } from "../../contexts/auth";
import { userDetailData } from "../../contexts/user";
import { meetListData } from "../../contexts/meet";
import { GlobalContext } from "./../../contexts/provider";
import "./homepage.css";
import DialogMeet from "./DialogMeet";
import { TableRoom } from "../../components/TableRoom/TableRoom";

export const textModel = {
  titleH1: "Premium video meetings. Now free for everyone.",
  titlep:
    "Unicorn for you, We re here to help you connect, communicate, and express your ideas so you can get more done together.",
  btnNewMeeting: "New Meeting",
  btnCreateMeetingLater: " Create a meeting to use later",
  btnJoin: "Join",
  aHelpText: "Learn more",
  aHelpTextAbout: "about Unicorn",
  imgContent: "https://res.cloudinary.com/boo-it/image/upload/v1648690218/test/fgvvdhwkoowj5xcdqqzt.png"
};

export const textPlaceholder = {
  inputEnterCodeOrLink: "Enter a code or link",
};

export const testId = {
  titleH1: "title-h1",
  titlep: "title-p",
  btnNewMeeting: "btn-new-meeting",
  btnCreateMeetingLater: "btn-create-meeting-later",
  inputEnterCode: "input-enter-code",
  btnJoin: "btn-join",
  aHelpText: "help-text",
  aHelpTextAbout: "help-text-about",
  imgContent: "img-content"
};

export function HomePage() {
  const [room_name, setRoomName] = useState("");
  const [idTokenRoom, setIdTokenRoom] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [openDialogMeet, setOpenDialogMeet] = React.useState(false);
  const open = Boolean(anchorEl);
  const homeProvider = useContext<any>(GlobalContext);
  const {
    authDetailState,
    authDetailDispatch,
    userDetailDispatch,
    meetListDispatch,
  } = homeProvider;

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [textErrorEmpty, setTextErrorEmpty] = useState(false);
  const [textErrorWorng, setTextErrorWorng] = useState(false);

  const joinRoomURL = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/room/exits-room/${room_name}`,
      { withCredentials: true }
    );
    if (res.data.data === true) {
      navigate("/room/" + room_name);
    } else {
      setTextErrorEmpty(true);
    }
  };

  const onKeyDownCodeOrLink = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === "Enter") {
      joinRoomURL();
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const id_token = await auth.currentUser?.getIdToken(true);
        const res = await axios
          .post(
            "http://localhost:8080/api/auth/google",
            { id_token },
            { withCredentials: true }
          )
          .then(async () => {
            await authDetailDispatch(authDetailData({ isLogin: true }));
            await userDetailDispatch(
              userDetailData({
                uid_google: result.user.uid,
                full_name: `${result.user.displayName}`,
                ava_url: `${result.user.photoURL}`,
              })
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanleJoin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const id_token = await auth.currentUser?.getIdToken(true);
        const res = await axios
          .post(
            "http://localhost:8080/api/auth/google",
            { id_token },
            { withCredentials: true }
          )
          .then(async () => {
            await authDetailDispatch(authDetailData({ isLogin: true }));
            await userDetailDispatch(
              userDetailData({
                uid_google: result.user.uid,
                full_name: `${result.user.displayName}`,
                ava_url: `${result.user.photoURL}`,
              })
            );
          });
        navigate("/waitting");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h1 data-testid={testId.titleH1}>{textModel.titleH1}</h1>
            <p data-testid={testId.titlep}>{textModel.titlep}</p>
            <div className="action-btn">
              {authDetailState?.payload?.isLogin === true ? (
                <button className="btn green" onClick={handleClickPopover} data-testid={testId.btnNewMeeting}>
                  <FontAwesomeIcon className="icon-block" icon={faVideo} />
                  {textModel.btnNewMeeting}
                </button>
              ) : (
                <button className="btn green" onClick={signInWithGoogle} data-testid={testId.btnNewMeeting}>
                  <FontAwesomeIcon className="icon-block" icon={faVideo} />
                  {textModel.btnNewMeeting}
                </button>
              )}

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="btn-meeting">
                  <button
                    className="btn-conversations"
                    onClick={() => {
                      setOpenDialogMeet(true);
                    }}
                    data-testid={testId.btnCreateMeetingLater}
                  >
                    {textModel.btnCreateMeetingLater}
                  </button>

                  <DialogMeet
                    openDialogMeet={openDialogMeet}
                    setOpenDialogMeet={setOpenDialogMeet}
                    setAnchor={setAnchorEl}
                  />
                </div>
              </Popover>
              <div className="input-block">
                <div className="input-section">
                  <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                  <input
                    placeholder="Enter a code or link"
                    onChange={(e) => setRoomName(e.target.value)}
                    onKeyDown={onKeyDownCodeOrLink}
                    data-testid={testId.inputEnterCode}
                  />
                </div>
                {authDetailState?.payload?.isLogin === true ? (
                  <button
                    className="btn no-bg btn-join"
                    onClick={() => joinRoomURL()}
                    data-testid={testId.btnJoin}
                  >
                   {textModel.btnJoin}
                  </button>
                ) : (
                  <button
                    className="btn no-bg btn-join"
                    onClick={() => hanleJoin()}
                    data-testid={testId.btnJoin}
                  >
                    {textModel.btnJoin}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="##" data-testid={testId.aHelpText}>{textModel.aHelpText}</a> about Unicorn
          </div>
          <TableRoom />
        </div>
        <div className="right-side">
          <div className="content">
            <img src={textModel.imgContent} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
}
