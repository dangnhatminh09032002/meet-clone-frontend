import React, {
  lazy,
  Suspense,
  useContext,
  useLayoutEffect,
  Fragment,
} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { GlobalContext } from "../contexts/provider";
import { authDetailData } from "../contexts/auth";
import { userDetailData } from "../contexts";
import server from "../configs/axios-config";
import { SchedulePage } from "../pages/schedulePage/SchedulePage";

const StopRoom: any = lazy(() =>
  import("../pages").then(({ StopRoom }) => ({ default: StopRoom }))
);
const PreJoinPage: any = lazy(() =>
  import("../pages").then(({ PreJoinPage }) => ({ default: PreJoinPage }))
);
const RoomPage: any = lazy(() =>
  import("../pages").then(({ RoomPage }) => ({ default: RoomPage }))
);
const HomePage: any = lazy(() =>
  import("../pages").then(({ HomePage }) => ({ default: HomePage }))
);

export const Layout = () => {
  const authProvider = useContext<any>(GlobalContext);
  const { authDetailState, authDetailDispatch, userDetailDispatch } =
    authProvider;

  useLayoutEffect(() => {
    const checkVerify = async () => {
      await server
        .get("auth/verify")
        .then((result) => {
          authDetailDispatch(authDetailData({ isLogin: true }));
          userDetailDispatch(
            userDetailData({
              uid_google: result.data.id,
              full_name: result.data.name,
              ava_url: result.data.picture,
            })
          );
        })
        .catch((err) => {
          authDetailDispatch(authDetailData({ isLogin: false }));
        });
    };
    checkVerify();
  }, [authDetailState.payload.isLogin]);

  return (
    <Suspense fallback={true}>
      {authDetailState.loading || (
        <Routes>
          {authDetailState.payload.isLogin && (
            <Fragment>
              <Route path="/prejoinroom/:room_id" element={<PreJoinPage />} />
              <Route path="/room/:room_id" element={<RoomPage />} />
              <Route path="/stoproom" element={<StopRoom />} />
              <Route path="/schedule" element={<SchedulePage />} />
            </Fragment>
          )}
          <Route path="/home" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      )}
    </Suspense>
  );
};
