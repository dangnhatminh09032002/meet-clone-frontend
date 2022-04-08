import { CommonState } from "../types";

export interface IMeet {
  id: string;
  room_name: string;
  user_id: string;
  friendly_id: string;
  created_at: string;
  updated_at: string;
}

export interface MeetListState extends CommonState {
  payload: IMeet[];
  loading: boolean;
}
