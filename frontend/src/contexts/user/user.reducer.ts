import { UserDetailActions } from "./user.actions";
import {
  USER_DETAIL_DATA,
  USER_DETAIL_ERROR,
  USER_DETAIL_FETCH,
} from "./user.constants";

import { UserDetailState } from "./user.types";

export const initialUserDetail: UserDetailState = {
  payload: {},
  loading: false,
};

export const userDetailReducer = (
  state = initialUserDetail,
  action: UserDetailActions
): UserDetailState => {
  switch (action.type) {
    case USER_DETAIL_FETCH:
      return { ...state };
    case USER_DETAIL_DATA:
      return { ...state };
    case USER_DETAIL_ERROR:
      return { ...state };
    default:
      return state;
  }
};
