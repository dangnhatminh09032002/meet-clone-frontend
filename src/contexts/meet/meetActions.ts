import {
  MEET_LIST_FETCH,
  MEET_LIST_DATA,
  MEET_LIST_ERROR,
  ADD_MEET,
  DELETE_MEET
} from "./meetConstants";
import { IMeet } from "./meetTypes";
import { CommonError } from "../types";

export interface MeetListFetch {
  type: typeof MEET_LIST_FETCH;
}

export interface MeetListData {
  type: typeof MEET_LIST_DATA;
  payload: IMeet[];
}

export interface MeetListError {
  type: typeof MEET_LIST_ERROR;
  error: CommonError;
}

export interface AddMeet {
  type: typeof ADD_MEET;
  payload: IMeet;
}

export interface DeleteMeet {
  type: typeof DELETE_MEET;
  payload: {id: IMeet['id']};
}

export type MeetListActions =
  | MeetListFetch
  | MeetListData
  | MeetListError
  | AddMeet
  | DeleteMeet;

export const meetListFetch = (): MeetListFetch => ({
  type: MEET_LIST_FETCH,
});

export const meetListData = (
  payload: MeetListData["payload"]
): MeetListData => ({
  type: MEET_LIST_DATA,
  payload,
});

export const meetListError = (
  payload: MeetListError["error"]
): MeetListError => ({
  type: MEET_LIST_ERROR,
  error: payload,
});

export const addMeet = (
  payload: AddMeet["payload"]
): AddMeet => ({
  type: ADD_MEET,
  payload,
});

export const deleteMeet = (
  payload: DeleteMeet["payload"]
): DeleteMeet => ({
  type: DELETE_MEET,
  payload,
});



