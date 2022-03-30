import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomeContainer } from '../containers';
import { StopRoom } from '../pages/stoproom/StopRoom';
import { RoomPage, WaittingPage } from '../pages';

export const Layout = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomeContainer />} />
            <Route path="/stoproom" element={<StopRoom />} />
            <Route path='/waitting' element={<WaittingPage />} />
            <Route path="/room/:roomName" element={<RoomPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
};
