import { Project } from "../../Project/Project.type";
import { ApiCallState } from "../../Utils";
import { BoardProject } from "../BoardProject/BoardProject.type";

export type StatusBoard = {
  id: number;
  title: string;
  priority: number;
  projects: BoardProject[];
};

export type StatusBoardStateTypes = {
  fetchAll: ApiCallState<StatusBoard[]>;
  fetchOne: ApiCallState<StatusBoard | {}>;
  fetchLoggedIn: ApiCallState<StatusBoard | {}>;
  fetchFeature:ApiCallState<StatusBoard|{}>;
};

export const StatusBoardActionTypes = {
  FETCH_ALL_STATUS_BOARD: "FETCH_ALL_STATUS_BOARD",
  FETCH_ALL_STATUS_BOARD_RESET: "FETCH_ALL_STATUS_BOARD_RESET",
  FETCH_ALL_STATUS_BOARD_FAILURE: "FETCH_ALL_STATUS_BOARD_FAILURE",
  FETCH_ALL_STATUS_BOARD_SUCCESS: "FETCH_ALL_STATUS_BOARD_SUCCESS",

  FETCH_ONE_STATUS_BOARD: "FETCH_ONE_STATUS_BOARD",
  FETCH_ONE_STATUS_BOARD_RESET: "FETCH_ONE_STATUS_BOARD_RESET",
  FETCH_ONE_STATUS_BOARD_FAILURE: "FETCH_ONE_STATUS_BOARD_FAILURE",
  FETCH_ONE_STATUS_BOARD_SUCCESS: "FETCH_ONE_STATUS_BOARD_SUCCESS",

  FETCH_LOGGED_IN_STATUS_BOARD: "FETCH_LOGGED_IN_STATUS_BOARD",
  FETCH_LOGGED_IN_STATUS_BOARD_RESET: "FETCH_LOGGED_IN_STATUS_BOARD_RESET",
  FETCH_LOGGED_IN_STATUS_BOARD_FAILURE: "FETCH_LOGGED_IN_STATUS_BOARD_FAILURE",
  FETCH_LOGGED_IN_STATUS_BOARD_SUCCESS: "FETCH_LOGGED_IN_STATUS_BOARD_SUCCESS",

  FETCH_FEATURE_STATUS_BOARD: "FETCH_FEATURE_STATUS_BOARD",
  FETCH_FEATURE_STATUS_BOARD_RESET: "FETCH_FEATURE_STATUS_BOARD_RESET",
  FETCH_FEATURE_STATUS_BOARD_FAILURE: "FETCH_FEATURE_STATUS_BOARD_FAILURE",
  FETCH_FEATURE_STATUS_BOARD_SUCCESS: "FETCH_FEATURE_STATUS_BOARD_SUCCESS",
};