import { CommonState } from "../types";

export interface IUser {
  id?: string;
  uid_google?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserDetailState extends CommonState {
  payload: IUser;
  loading: boolean;
}
