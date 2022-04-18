import './frameUsers.css';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function FrameShowUsers(props: any) {

    const setShowUsers = props.setShowUsers

    return(
        <div className="frameUsers">
            <div className="headerFrameUser">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Everyone</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip">
                        <CloseIcon onClick={() => setShowUsers(false)}/>
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>
            </div>

            <div className="inputFindUser">
                <div className="iconSearch">
                    <SearchIcon />
                </div>
                <input className="glo-input"
                    type="text"
                    placeholder="Find person"
                />
            </div>

            <div className="headerListUser">
                In a meeting
            </div>
            
            <div className="listUser">
                <div className="infoUsers">
                    <div className="avatarUser">
                        <img src="https://lh3.googleusercontent.com/a/AATXAJy-qB8gB7EjKkXwPV7WWfUHmg3ZHBb2SWw9rN_IMA=s192-c-mo" />
                    </div>

                    <div className="bodyInfo">
                        <div className="nameUser">Lê Văn Duy</div>
                        {/* check if === host => add class */}
                        <div className="description">Meeting organizer</div>
                    </div>

                    <div className="infoIcon">
                        <ManageAccountsIcon />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FrameShowUsers;