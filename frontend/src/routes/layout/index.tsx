import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage, WaittingPage, RoomPage } from '../../pages';

export const Layout = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/waitting" element={<WaittingPage />} />
            <Route path="/room/:room-name" element={<RoomPage />} />
            <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
    );
};
