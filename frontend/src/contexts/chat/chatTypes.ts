import { CommonState } from '../types';

export interface IMessage {
    room_name?: string;
    chat_user?: string;
    time?: string;
    message?: string;
}

export interface ChatDetailState extends CommonState{
    payload: IMessage[]
    loading: boolean
}