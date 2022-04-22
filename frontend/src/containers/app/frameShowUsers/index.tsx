import './frameUsers.css';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { memo, useEffect, useState } from 'react';
import { server } from '../../../configs/axios-config';

function FrameShowUsers(props: any) {
    const { setShowUsers, room_id, room, numParticipants, isHost } = props;
    const [listParticipant, setListParticipant] = useState<any>(null);

    // get Participant of room
    useEffect(() => {
        const getParticipant = async () => {
            await server
                .get(`rooms/${room_id}/participants`)
                .then((res) => setListParticipant(res.data));
        };
        getParticipant();
    }, [room_id, room, numParticipants]);

    return (
        <div className='frameUsers'>
            <div className='headerFrameUser'>
                <div className='headerTitleWrap'>
                    <div className='headerTitle'>Everyone</div>
                </div>
                <div className='headerIcon'>
                    <div className='glo-icon-close tooltip'>
                        <CloseIcon onClick={() => setShowUsers(false)} />
                        <span className='tooltiptext'>Close</span>
                    </div>
                </div>
            </div>

            <div className='inputFindUser'>
                <div className='iconSearch'>
                    <SearchIcon />
                </div>
                <input className='glo-input' type='text' placeholder='Find person' />
            </div>

            <div className='headerListUser'>In a meeting</div>
            <div className='listUser'>
                {listParticipant?.map((user: any, index: any) => (
                    <div className='infoUsers' key={index}>
                        <div className='avatarUser'>
                            <img src={user.picture} referrerPolicy='no-referrer' alt='avatar' />
                        </div>

                        <div className='bodyInfo'>
                            <div className='nameUser'>{user.name}</div>
                            {/* check if === host => add class */}
                            {isHost && <div className='description'>Meeting organizer</div>}
                        </div>

                        <div className='infoIcon'>
                            <ManageAccountsIcon />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(FrameShowUsers);
