import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomeContainer } from '../containers';
import { StopRoom } from '../pages/stoproom/StopRoom';
import { RoomPage, WaittingPage } from '../pages';
import axios from 'axios';
import { GlobalContext } from '../contexts/provider';
import { authDetailData } from '../contexts/auth';
import { userDetailData } from '../contexts';

export const Layout = () => {
    const authProvider = useContext<any>(GlobalContext);
    const {authDetailState, authDetailDispatch, userDetailDispatch} = authProvider;
    useEffect( () => {
        const checkVerify = async () => {
            const res = await axios.get('http://localhost:8080/api/auth/verify', { withCredentials: true });
            await authDetailDispatch(authDetailData({isLogin: true}));
            await userDetailDispatch(userDetailData({
                uid_google: res.data.data.id,
                full_name: res.data.data.name,
                avaURL: res.data.data.picture,
            }));
        };
        checkVerify();
    }, []);
    return (
        <Routes>
            <Route path="/home" element={<HomeContainer />} />
            {authDetailState.payload.isLogin ? '' : <Route path="*" element={<Navigate to="/home" />} />}
            <Route path="/stoproom" element={<StopRoom />} />
            <Route path='/waitting/:roomName' element={<WaittingPage />  } />
            <Route path="/room/:roomName" element={<RoomPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
};
