import { CommonState } from '../types';

export interface IUser {
  uid_google?: string;
  full_name?: string;
  ava_url?: string;
}

export interface UserDetailState extends CommonState {
  payload: IUser;
  loading: boolean;
}
