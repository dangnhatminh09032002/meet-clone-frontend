import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext, useContext } from 'react';
import { auth } from '../../configs/firebase-config';
import { GlobalContext } from '../provider';
import { userDetailData } from '../user';
import { authDetailData } from './authActions';

export const AuthContext = createContext({});

export default function AuthProvider(props: any) {

  const globalContext = useContext<any>(GlobalContext)

  const { authDetailDispatch, userDetailDispatch } = globalContext

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const id_token = await auth.currentUser?.getIdToken(true);
        await axios
          .post(
            'http://localhost:8080/api/auth/google',
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

  return (
    <AuthContext.Provider value={{ signInWithGoogle }}>{props.children}</AuthContext.Provider>
  );
}
