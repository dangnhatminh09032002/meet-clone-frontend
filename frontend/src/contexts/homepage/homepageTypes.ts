import { CommonState } from '../types';

export interface Homepage {
  id?: string;
  uid_google?: string;
  // friendly_id?: string;
}

export interface HomepageDetailState extends CommonState {
  payload: Homepage;
  loading: boolean;
}
