import Button from "@mui/material/Button";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../../configs/firebase-config";
import { useNavigate } from "react-router-dom";
import "./header.css";

export function Header() {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const idToken = await auth.currentUser?.getIdToken(true);
        const res = await axios.post(
          "http://localhost:8080/api/auth/google",
          { idToken },
          { withCredentials: true }
        );
        navigate("/home");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='header'>
      <div className='logo'>
        <img
          src='https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_2x_icon_124_40_292e71bcb52a56e2a9005164118f183b.png'
          alt=''
        />
        <span className='help-text'>Meet</span>
      </div>
      <div className='action-btn'>
        <Button variant='outlined' onClick={signInWithGoogle}>
          Login
        </Button>
      </div>
    </div>
  );
}
