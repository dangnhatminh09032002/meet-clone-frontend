import React, { lazy, Suspense, useContext, useLayoutEffect, Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/provider';
import { authDetailData } from '../contexts/auth';
import { userDetailData } from '../contexts';
import server from '../configs/axios-config';

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
            await server
                .get('auth/verify')
                .then((result) => {
                    authDetailDispatch(authDetailData({ isLogin: true }));
                    userDetailDispatch(
                        userDetailData({
                            uid_google: result.data.data.id,
                            full_name: result.data.data.name,
                            ava_url: result.data.data.picture,
                        })
                    );
                })

                .catch((err) => {
                    authDetailDispatch(authDetailData({ isLogin: false }));
                });

        };
        checkVerify();
    }, []);

    return (
        <Suspense fallback={true}>
            {authDetailState.loading ||
                <Routes>
                    {authDetailState.payload.isLogin &&
                        <Fragment>
                            <Route path='/prejoinroom/:roomName' element={<PreJoinPage />} />
                            <Route path='/room/:room_id' element={<RoomPage />} />
                            <Route path='/stoproom' element={<StopRoom />} />
                        </Fragment>
                    }
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/*' element={<Navigate to='/home' />} />
                </Routes>}
        </Suspense>
    );
};
