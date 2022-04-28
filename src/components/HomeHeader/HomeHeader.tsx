import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/authProvider';
import { GlobalContext } from './../../contexts/provider';
import './homeHeader.css';

export const modelHeader = {
    imgLogo:
        'https://res.cloudinary.com/boo-it/image/upload/v1650618756/test/hikkzdzlqt7qrwt2qr9x.svg',
    textSpanLogo: 'Unicorn',
};

export const testId = {
    imgLogo: 'img-logo',
    textSpanLogo: 'text-span-logo',
};

export function Header() {
    const authProvider = useContext<any>(GlobalContext);
    const { authDetailState, userDetailState } = authProvider;
    const authContext = useContext<any>(AuthContext);
    const { signInWithGoogle, logout } = authContext;
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/home');
    };

    const toHome = () => {
        navigate('/home');
    };

    return (
        <Container maxWidth={false} sx={{ pl: { xs: 0, lg: 0 } }}>
            <Toolbar disableGutters>
                <div className='header' onClick={() => toHome()}>
                    <div className='logo'>
                        <img
                            src='https://res.cloudinary.com/boo-it/image/upload/v1650618756/test/hikkzdzlqt7qrwt2qr9x.svg'
                            alt=''
                            data-testid={testId.imgLogo}
                        />
                        <span className='help-text' data-testid={testId.textSpanLogo}>
                            {modelHeader.textSpanLogo}
                        </span>
                    </div>
                </div>
                <div className='header-content'>
                    <Box sx={{ flexGrow: 0 }}>
                        {authDetailState?.payload.isLogin ? (
                            <div>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <img
                                            alt='Ava'
                                            src={userDetailState?.payload.ava_url}
                                            referrerPolicy='no-referrer'
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
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
                                    <MenuItem
                                        disabled
                                        onClick={() => {
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign='center'>Change Account</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleLogout();
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Typography textAlign='center'>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <div>
                                <Tooltip title=''>
                                    <Button
                                        sx={{ color: '#0288d1' }}
                                        variant='outlined'
                                        color='info'
                                        onClick={async () => await signInWithGoogle()}
                                    >
                                        Login
                                    </Button>
                                </Tooltip>
                            </div>
                        )}
                    </Box>
                </div>
            </Toolbar>
        </Container>
    );
}
