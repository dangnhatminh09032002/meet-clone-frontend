import React, { Fragment, lazy, Suspense, useContext, useLayoutEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { server } from '../configs/axios-config';
import { userDetailData } from '../contexts';
import { authDetailData } from '../contexts/auth';
import { GlobalContext } from '../contexts/provider';
import { SchedulePage } from '../pages/schedulePage/SchedulePage';

const StopRoom: any = lazy(() =>
    import('../pages').then(({ StopRoom }) => ({ default: StopRoom }))
);
const PreJoinPage: any = lazy(() =>
    import('../pages').then(({ PreJoinPage }) => ({ default: PreJoinPage }))
);
const RoomPage: any = lazy(() =>
    import('../pages').then(({ RoomPage }) => ({ default: RoomPage }))
);
const HomePage: any = lazy(() =>
    import('../pages').then(({ HomePage }) => ({ default: HomePage }))
);

export const Layout = () => {
    const authProvider = useContext<any>(GlobalContext);
    const { authDetailState, authDetailDispatch, userDetailDispatch } = authProvider;

    useLayoutEffect(() => {
        const checkVerify = async () => {
            await server()
                .get(`auth/validate?id_token=${sessionStorage.getItem('id_token')}`)
                .then((result) => {
                    authDetailDispatch(authDetailData({ isLogin: true }));
                    userDetailDispatch(
                        userDetailData({
                            user_id: result.data.id,
                            full_name: result.data.name,
                            ava_url: result.data.picture,
                        })
                    );
                })
                .catch(() => {
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
                            <Route path='/prejoinroom/:room_id' element={<PreJoinPage />} />
                            <Route path='/room/:room_id' element={<RoomPage />} />
                            <Route path='/stoproom/:room_id' element={<StopRoom />} />
                            <Route path='/schedule' element={<SchedulePage />} />
                        </Fragment>
                    )}
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/*' element={<Navigate to='/home' />} />
                </Routes>
            )}
        </Suspense>
    );
};
