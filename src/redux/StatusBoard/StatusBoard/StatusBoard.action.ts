import { StatusBoardActionTypes } from "./StatusBoard.type";

export const fetchAllStatusBoard = (payload?: any) => ({
  type: StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD,
  payload: payload,
});

export const fetchOneStatusBoard = (payload?: any) => ({
  type: StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD,
  payload: payload,
});

export const fetchLoggedInStatusBoard = (payload?: any) => ({
  type: StatusBoardActionTypes.FETCH_LOGGED_IN_STATUS_BOARD,
  payload: payload,
});

export const fetchAllStatusBoardReset = (payload?: any) => ({
  type: StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD_RESET,
  payload: payload,
});

export const fetchFeatureStatusBoard = (payload?: any) => ({
  type: StatusBoardActionTypes.FETCH_FEATURE_STATUS_BOARD,
  payload: payload,
});