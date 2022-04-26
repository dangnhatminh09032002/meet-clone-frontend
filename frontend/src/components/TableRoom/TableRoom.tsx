import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import OutputIcon from '@mui/icons-material/Output';
import {
    Alert,
    Button,
    Card,
    CardContent,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverAuthen } from '../../configs/axios-config';
import { meetListData } from '../../contexts/meet';
import { GlobalContext } from '../../contexts/provider';
import '../TableRoom/tableroom.css';

export function TableRoom() {
    const homeProvider = useContext<any>(GlobalContext);
    const { authDetailState, meetListState, meetListDispatch } = homeProvider;
    const navigate = useNavigate();

    const [openSnackbarCode, setOpenSnackbarCode] = React.useState(false);

    useEffect(() => {
        const getListRoom = async () => {
            await serverAuthen.get('rooms').then(async (result) => {
                await meetListDispatch(meetListData(result.data));
            });
        };
        getListRoom();
    }, [authDetailState]);

    const handleDeleteRoom = async () => {
        await serverAuthen.delete('rooms');
    };

    const handleCopyLink = (nameRoom: any) => {
        navigator.clipboard.writeText(nameRoom);
        setOpenSnackbarCode(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbarCode(false);
    };

    return (
        <div className='tableroom-content'>
            {authDetailState?.payload?.isLogin === true ? (
                <TableContainer component={Paper} sx={{ maxHeight: 330 }}>
                    <Table stickyHeader>
                        {meetListState.payload.length == 0 ? (
                            <TableHead>
                                <TableRow>
                                    <TableCell>There are no meeting rooms</TableCell>
                                </TableRow>
                            </TableHead>
                        ) : (
                            <TableHead className='bg-table-header'>
                                <TableRow>
                                    <TableCell className='text-while-table-header' width='150px'>
                                        Name
                                    </TableCell>
                                    <TableCell
                                        className='text-while-table-header glo-text-center'
                                        width='500px'
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        )}

                        <TableBody>
                            {meetListState.payload.map((meet: any, index: any) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {meet.room_name.length > 10 ? (
                                                <Typography noWrap>{`${meet.room_name.slice(
                                                    0,
                                                    10
                                                )}...`}</Typography>
                                            ) : (
                                                <Typography noWrap>{meet.room_name}</Typography>
                                            )}
                                        </TableCell>

                                        <TableCell className='glo-text-center'>
                                            <Tooltip title='Copy'>
                                                <Button
                                                    variant='outlined'
                                                    startIcon={<ContentCopyIcon />}
                                                    className='link-room'
                                                    onClick={() =>
                                                        handleCopyLink(meet?.friendly_id)
                                                    }
                                                >
                                                    Copy
                                                </Button>
                                            </Tooltip>
                                            <Snackbar
                                                open={openSnackbarCode}
                                                autoHideDuration={6000}
                                                onClose={handleClose}
                                            >
                                                <Alert
                                                    onClose={handleClose}
                                                    severity='success'
                                                    sx={{ width: '100%' }}
                                                >
                                                    You have copied the link of the meeting!
                                                </Alert>
                                            </Snackbar>
                                            <Button
                                                variant='outlined'
                                                className='link-room'
                                                color='success'
                                                startIcon={<OutputIcon />}
                                                onClick={() => {
                                                    navigate('/room/' + meet.friendly_id);
                                                }}
                                            >
                                                Redirect
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                color='error'
                                                startIcon={<DeleteIcon />}
                                                onClick={handleDeleteRoom}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography color='text.secondary'>Create your own meeting room</Typography>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
