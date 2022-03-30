import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configs/firebase-config';
import { authDetailData, authLogout } from '../../contexts/auth';
import { GlobalContext } from './../../contexts/provider';
import './homeHeader.css';

export function Header() {
    const navigate = useNavigate();
    const authProvider = useContext<any>(GlobalContext);
    const {authDetailState, authDetailDispatch} = authProvider;
   
    
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [hasLogin, setHasLogin] = useState<boolean>(false);
    const [avaURL, setAvaURL] = useState<any>('');

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const urlAvatar = result.user.photoURL;
                setAvaURL(urlAvatar);
                const idToken = await auth.currentUser?.getIdToken(true);
                const res = await axios.post(
                    'http://localhost:8080/api/auth/google',
                    { idToken },
                    { withCredentials: true }
                )
                    .then( async (response) => {
                        await authDetailDispatch(authDetailData());
                    });
                setHasLogin(!authDetailState.payload.isLogin);
                
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [ cookies, setCookie, removeCookie ] = useCookies(['sid']);

    const handleLogout = () => {
        setHasLogin(authDetailDispatch(authLogout()));
        removeCookie('sid'); 
    };

    return (
        <div className="header">
            <div className="logo">
                <img
                    src="https://res.cloudinary.com/boo-it/image/upload/v1648520027/test/oefxnl6sa1peftkdkhag.svg"
                    alt=""
                />
                <span className="help-text">Unicorn</span>
            </div>
            <div className="">
                {hasLogin === true ? (
                    <Container maxWidth="xl">
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Ava" src={avaURL} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
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
                                <MenuItem  onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={() => handleLogout()}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Container>
                
                ) : (
                    <Button variant="outlined" onClick={signInWithGoogle}>
                        Login
                    </Button>
                )}
                
            </div>
        </div>
    );
}
