import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configs/firebase-config';
import { authDetailData, authLogout } from '../../contexts/auth';
import { userDetailData } from '../../contexts/user';
import { GlobalContext } from './../../contexts/provider';
import './homeHeader.css';

export function Header() {
    const authProvider = useContext<any>(GlobalContext);
    const { authDetailState, authDetailDispatch, userDetailState, userDetailDispatch } =
        authProvider;
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const id_token = await auth.currentUser?.getIdToken(true);
                console.log(id_token);
                const res = await axios
                    .post(
                        'http://localhost:8080/api/auth/google',
                        { id_token },
                        { withCredentials: true }
                    )
                    .then(async () => {
                        await authDetailDispatch(authDetailData({ isLogin: true }));
                        await userDetailDispatch(
                            userDetailData({
                                uid_google: result.user.uid,
                                full_name: `${result.user.displayName}`,
                                ava_url: `${result.user.photoURL}`,
                            })
                        );
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogout = async () => {
        authDetailDispatch(authLogout());
        userDetailDispatch(
            userDetailData({
                uid_google: '',
                full_name: '',
                ava_url: '',
            })
        );
        await axios.get('http://localhost:8080/api/auth/logout', { withCredentials: true });
        navigate('/home');
    };

    return (
        <div className='header'>
            <div className='logo'>
                <img
                    src='https://res.cloudinary.com/boo-it/image/upload/v1649148875/test/toi78rot2nfxprqp7ey4.png'
                    alt=''
                />
                <span className='help-text'>Unicorn</span>
            </div>
            <div className='header-content'>
                {authDetailState?.payload?.isLogin ? (
                    <Container maxWidth='xl'>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, w: '40px' }}>
                                    <img
                                        alt='Ava'
                                        src={userDetailState.payload.ava_url}
                                        referrerPolicy='no-referrer'
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px', py: '0' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    Change Account
                                </MenuItem >
                                <MenuItem onClick={() => handleLogout()}>
                                    <div className='btn-logout'>
                                        Logout
                                    </div>
                                </MenuItem>
                            </Menu >
                        </Box >
                    </Container >
                ) : (
                    <Button variant='outlined' onClick={() => signInWithGoogle()}>
                        Login
                    </Button>
                )
                }
            </div >
        </div >
    );
}