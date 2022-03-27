import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomeContainer } from "../../containers";

import { AppContext } from "../../App";

export const Layout = () => {
  const value = useContext(AppContext);

  console.log(value);

  return (
    <Routes>
      <Route path="/home" element={<HomeContainer />} />
      {/* <Route path='/waitting' element={<WaittingPage />} /> */}
      <Route path="/room/:roomName" element={<HomeContainer />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
