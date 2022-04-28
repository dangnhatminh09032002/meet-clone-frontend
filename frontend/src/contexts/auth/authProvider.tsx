import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext, useContext } from 'react';
import { auth } from '../../configs/firebase-config';
import { GlobalContext } from '../provider';
import { userDetailData } from '../user';
import { authDetailData, authLogout } from './authActions';
import { server } from '../../configs/axios-config';

export const AuthContext = createContext({});

export default function AuthProvider(props: any) {
    const globalContext = useContext<any>(GlobalContext);
    const { authDetailDispatch, userDetailDispatch } = globalContext;

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then(async (result) => {
                const id_token = await auth.currentUser?.getIdToken(true);
                console.log('id_token-gg', id_token);
                await server()
                    .get(`auth/login/google?id_token=${id_token}`)
                    .then(async (res) => {
                        await sessionStorage.setItem('id_token', res.data.id_token);
                        await authDetailDispatch(authDetailData({ isLogin: true }));
                        await userDetailDispatch(
                            userDetailData({
                                user_id: result.user.uid,
                                full_name: `${result.user.displayName}`,
                                ava_url: `${result.user.photoURL}`,
                            })
                        );
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const logout = async () => {
        authDetailDispatch(authLogout());
        userDetailDispatch(
            userDetailData({
                user_id: '',
                full_name: '',
                ava_url: '',
            })
        );
        sessionStorage.clear();
        await server().get('auth/logout');
    };

    return (
        <AuthContext.Provider value={{ signInWithGoogle, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}
