import { MeetListActions } from "./meetActions";
import {
  MEET_LIST_FETCH,
  MEET_LIST_DATA,
  MEET_LIST_ERROR,
  ADD_MEET,
} from "./meetConstants";
import { MeetListState } from "./meetTypes";

export const initialMeet: MeetListState = {
  payload: [],
  loading: false,
};

export const meetListReducer = (
  state = initialMeet,
  action: MeetListActions
): MeetListState => {
  switch (action.type) {
    case MEET_LIST_FETCH:
      return { ...state };
    case MEET_LIST_DATA:
      return { ...state, payload: action.payload };
    case MEET_LIST_ERROR:
      return { ...state, error: action.error };
    case ADD_MEET:
      state.payload.unshift(action.payload);
      return { ...state };
    default:
      return state;
  }
};
