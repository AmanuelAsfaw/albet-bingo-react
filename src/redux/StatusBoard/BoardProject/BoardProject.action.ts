import { BoardProjectActionTypes } from "./BoardProject.type";

export const fetchAllUser = (payload?: any) => ({
  type: BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT,
  payload: payload,
});

export const fetchOneBoardProject = (payload?: any) => ({
  type: BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT,
  payload: payload,
});

export const fetchLoggedInBoardProject = (payload?: any) => ({
  type: BoardProjectActionTypes.FETCH_LOGGED_IN_BOARD_PROJECT,
  payload: payload,
});

export const fetchAllBoardProjectReset = (payload?: any) => ({
  type: BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT_RESET,
  payload: payload,
});

export const fetchFeatureBoardProject = (payload?: any) => ({
  type: BoardProjectActionTypes.FETCH_FEATURE_BOARD_PROJECT,
  payload: payload,
});