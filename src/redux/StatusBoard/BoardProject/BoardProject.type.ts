import { Project } from "../../Project/Project.type";
import { ApiCallState } from "../../Utils";
import { StatusBoard } from "../StatusBoard/StatusBoard.type";

export type BoardProject = {
  id: number;
  project_id: number;
  board_id: number;
  project: Project;
  board: StatusBoard;
  priority: number;
  updatedAt: string;

};

export type BoardProjectStateTypes = {
  fetchAll: ApiCallState<BoardProject[]>;
  fetchOne: ApiCallState<BoardProject | {}>;
  fetchLoggedIn: ApiCallState<BoardProject | {}>;
  fetchFeature:ApiCallState<BoardProject|{}>;
};

export const BoardProjectActionTypes = {
  FETCH_ALL_BOARD_PROJECT: "FETCH_ALL_BOARD_PROJECT",
  FETCH_ALL_BOARD_PROJECT_RESET: "FETCH_ALL_BOARD_PROJECT_RESET",
  FETCH_ALL_BOARD_PROJECT_FAILURE: "FETCH_ALL_BOARD_PROJECT_FAILURE",
  FETCH_ALL_BOARD_PROJECT_SUCCESS: "FETCH_ALL_BOARD_PROJECT_SUCCESS",

  FETCH_ONE_BOARD_PROJECT: "FETCH_ONE_BOARD_PROJECT",
  FETCH_ONE_BOARD_PROJECT_RESET: "FETCH_ONE_BOARD_PROJECT_RESET",
  FETCH_ONE_BOARD_PROJECT_FAILURE: "FETCH_ONE_BOARD_PROJECT_FAILURE",
  FETCH_ONE_BOARD_PROJECT_SUCCESS: "FETCH_ONE_BOARD_PROJECT_SUCCESS",

  FETCH_LOGGED_IN_BOARD_PROJECT: "FETCH_LOGGED_IN_BOARD_PROJECT",
  FETCH_LOGGED_IN_BOARD_PROJECT_RESET: "FETCH_LOGGED_IN_BOARD_PROJECT_RESET",
  FETCH_LOGGED_IN_BOARD_PROJECT_FAILURE: "FETCH_LOGGED_IN_BOARD_PROJECT_FAILURE",
  FETCH_LOGGED_IN_BOARD_PROJECT_SUCCESS: "FETCH_LOGGED_IN_BOARD_PROJECT_SUCCESS",

  FETCH_FEATURE_BOARD_PROJECT: "FETCH_FEATURE_BOARD_PROJECT",
  FETCH_FEATURE_BOARD_PROJECT_RESET: "FETCH_FEATURE_BOARD_PROJECT_RESET",
  FETCH_FEATURE_BOARD_PROJECT_FAILURE: "FETCH_FEATURE_BOARD_PROJECT_FAILURE",
  FETCH_FEATURE_BOARD_PROJECT_SUCCESS: "FETCH_FEATURE_BOARD_PROJECT_SUCCESS",
};