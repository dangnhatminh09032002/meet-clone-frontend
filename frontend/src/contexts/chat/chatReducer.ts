import { ChatDetailActions } from './chatActions';

import {
    ADD_MESSAGE,
    SET_MESSAGE_INPUT
} from './chatConstants';

import { ChatDetailState } from './chatTypes';

export const initialChatDetail: ChatDetailState = {
    payload: [],
    loading: false,
};

export const chatDetailReducer = (
    state = initialChatDetail,
    action: ChatDetailActions
): ChatDetailState => {
    switch (action.type) {
    case ADD_MESSAGE:
        return { ...state };
    case SET_MESSAGE_INPUT:
        return { ...state };
    default:
        return state;
    }
};
