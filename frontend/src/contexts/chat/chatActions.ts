import {
    ADD_MESSAGE,
    SET_MESSAGE_INPUT
} from './chatConstants';

import {IMessage, ChatDetailState} from './chatTypes';

// chat interface
export interface SendMessage {
    type: typeof ADD_MESSAGE;
    payload: IMessage
}

export interface SetInputMessage {
    type: typeof SET_MESSAGE_INPUT;
    payload: ChatDetailState
}

export type ChatDetailActions = 
 | SendMessage
 | SetInputMessage;


// chat actions
export const setInputMessage = (
    payload: SetInputMessage['payload']
): ChatDetailActions => ({
    type: SET_MESSAGE_INPUT,
    payload,
});

export const sendMessage = (
    payload: SendMessage['payload']
): ChatDetailActions => ({
    type: ADD_MESSAGE,
    payload,
});