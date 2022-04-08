import './frameInfo.css';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

function FrameInfoRoom() {

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.href}`);

        Store.addNotification({
            message: 'Copied the meeting link',
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            insert: 'bottom',
            container: 'bottom-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000,
              showIcon: true
            },
        })
    }


    return(
        <div className="frameInfo">
            <div className="headerFrameUser">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Details of the meeting</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip">
                        <CloseIcon/>
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>
            </div>

            <div className="infoRoom">
                <div className="infoTitle">
                    Information on how to join
                </div>
                <div className="linkRoom">
                    {window.location.href}
                </div>

                <div className="copyInfo" 
                    onClick={handleCopy}
                >
                    <div className="copyInfoIcon"><ContentCopyIcon/></div>
                    <div className="copyInfoText">Copy information on how to join</div>
                </div>
            </div>

            <div className="separator"></div>
        </div>
    );
}

export default FrameInfoRoom;