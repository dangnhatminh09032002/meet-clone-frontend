import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage, RoomPage } from "../../pages";

import { AppContext } from "../../App";

export const Layout = () => {
  const value = useContext(AppContext);

  console.log(value);

  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
      {/* <Route path='/waitting' element={<WaittingPage />} /> */}
      <Route path='/room/:roomName' element={<RoomPage />} />
      <Route path='/*' element={<Navigate to='/home' />} />
    </Routes>
  );
};
