import { CommonState } from '../types';

export interface IAuth {
  isLogin?: boolean;
}

export interface AuthDetailState extends CommonState {
  payload: IAuth;
  loading: boolean;
}
