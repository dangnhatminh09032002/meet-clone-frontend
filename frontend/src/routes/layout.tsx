import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomeContainer } from '../containers';
import {RoomPage} from '../pages/room/RoomPage';

export const Layout = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomeContainer />} />
            {/* <Route path='/waitting' element={<WaittingPage />} /> */}
            <Route path="/room" element={<RoomPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
};
