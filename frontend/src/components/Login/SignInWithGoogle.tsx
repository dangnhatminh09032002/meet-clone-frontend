import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from '../../configs/firebase-config';

export const SignInWithGoogle = () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async () => {
            const id_token = await auth.currentUser?.getIdToken(true);
            console.log(id_token);
            await axios
                .post(
                    'http://localhost:8080/api/auth/google',
                    { id_token },
                    { withCredentials: true }
                )
        })
        .catch((err) => {
            console.log(err);
        });

}