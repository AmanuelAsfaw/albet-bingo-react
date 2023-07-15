import { ProjectBoardTaskActionTypes } from "./ProjectBoardTask.type";

export const fetchAllUser = (payload?: any) => ({
  type: ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK,
  payload: payload,
});

export const fetchOneBoardProject = (payload?: any) => ({
  type: ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK,
  payload: payload,
});

export const fetchLoggedInBoardProject = (payload?: any) => ({
  type: ProjectBoardTaskActionTypes.FETCH_LOGGED_IN_PROJECT_BOARD_TASK,
  payload: payload,
});

export const fetchAllBoardProjectReset = (payload?: any) => ({
  type: ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK_RESET,
  payload: payload,
});

export const fetchFeatureBoardProject = (payload?: any) => ({
  type: ProjectBoardTaskActionTypes.FETCH_FEATURE_PROJECT_BOARD_TASK,
  payload: payload,
});