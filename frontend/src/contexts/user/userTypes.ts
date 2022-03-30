import { CommonState } from '../types';

export interface IUser {
  id?: string;
  uid_google?: string;
  full_name?: string;
  avaURL?: string;
}

export interface UserDetailState extends CommonState {
  payload: IUser;
  loading: boolean;
}
