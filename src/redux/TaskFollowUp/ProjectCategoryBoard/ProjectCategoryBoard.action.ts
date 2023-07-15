import { ProjectCategoryBoardActionTypes } from "./ProjectCategoryBoard.type";

export const fetchAllProjectCategoryBoard = (payload?: any) => ({
  type: ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD,
  payload: payload,
});

export const fetchOneProjectCategoryBoard = (payload?: any) => ({
  type: ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD,
  payload: payload,
});

export const fetchLoggedInProjectCategoryBoard = (payload?: any) => ({
  type: ProjectCategoryBoardActionTypes.FETCH_LOGGED_IN_PROJECT_CATEGORY_BOARD,
  payload: payload,
});

export const fetchAllProjectCategoryBoardReset = (payload?: any) => ({
  type: ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD_RESET,
  payload: payload,
});

export const fetchFeatureProjectCategoryBoard = (payload?: any) => ({
  type: ProjectCategoryBoardActionTypes.FETCH_FEATURE_PROJECT_CATEGORY_BOARD,
  payload: payload,
});