import React, {useState} from 'react';
import './frameChat.css';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

function frameChat() {
    // const [message, setMessage] = useState<any>(null);
    // const 

    // const handleSendMessage = () => {

    // };

    return (
        <div className="frameChat">
            <div className="headerFrameChat">
                <div className="headerTitleWrap">
                    <div className="headerTitle">Message in call</div>
                </div>
                <div className="headerIcon">
                    <div className="glo-icon-close tooltip">
                        <CloseIcon />
                        <span className="tooltiptext">Close</span>
                    </div>
                </div>  
            </div>

            

            <div className="bodyFrameChat">

            </div>

            <div className="footerFrameChat">
                <form className="formSendMessage">
                    <div className="footerInputChat">
                        <input 
                            placeholder="Send message for everybody"
                        />
                    </div>
                    <div className="footerChatIconSend">
                        <SendIcon />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default frameChat;