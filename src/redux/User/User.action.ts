import { UserActionTypes } from "./User.type";

export const fetchAllUser = (payload?: any) => ({
  type: UserActionTypes.FETCH_ALL_USER,
  payload: payload,
});

export const fetchOneUser = (payload?: any) => ({
  type: UserActionTypes.FETCH_ONE_USER,
  payload: payload,
});

export const fetchLoggedInUser = (payload?: any) => ({
  type: UserActionTypes.FETCH_LOGGED_IN_USER,
  payload: payload,
});

export const fetchAllUserReset = (payload?: any) => ({
  type: UserActionTypes.FETCH_ALL_USER_RESET,
  payload: payload,
});

export const fetchFeatureUser = (payload?: any) => ({
  type: UserActionTypes.FETCH_FEATURE_USER,
  payload: payload,
});