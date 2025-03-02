import { Project } from "../../Project/Project.type";
import { ApiCallState } from "../../Utils";
import { ProjectCategoryBoard } from "../ProjectCategoryBoard/ProjectCategoryBoard.type";

export type ProjectBoardTask = {
  id: number;
  title: string;
  board_id: number;
  board: ProjectCategoryBoard;
  priority: number;
  updatedAt: string;

};

export type ProjectBoardTaskStateTypes = {
  fetchAll: ApiCallState<ProjectBoardTask[]>;
  fetchOne: ApiCallState<ProjectBoardTask | {}>;
  fetchLoggedIn: ApiCallState<ProjectBoardTask | {}>;
  fetchFeature:ApiCallState<ProjectBoardTask|{}>;
};

export const ProjectBoardTaskActionTypes = {
  FETCH_ALL_PROJECT_BOARD_TASK: "FETCH_ALL_PROJECT_BOARD_TASK",
  FETCH_ALL_PROJECT_BOARD_TASK_RESET: "FETCH_ALL_PROJECT_BOARD_TASK_RESET",
  FETCH_ALL_PROJECT_BOARD_TASK_FAILURE: "FETCH_ALL_PROJECT_BOARD_TASK_FAILURE",
  FETCH_ALL_PROJECT_BOARD_TASK_SUCCESS: "FETCH_ALL_PROJECT_BOARD_TASK_SUCCESS",

  FETCH_ONE_PROJECT_BOARD_TASK: "FETCH_ONE_PROJECT_BOARD_TASK",
  FETCH_ONE_PROJECT_BOARD_TASK_RESET: "FETCH_ONE_PROJECT_BOARD_TASK_RESET",
  FETCH_ONE_PROJECT_BOARD_TASK_FAILURE: "FETCH_ONE_PROJECT_BOARD_TASK_FAILURE",
  FETCH_ONE_PROJECT_BOARD_TASK_SUCCESS: "FETCH_ONE_PROJECT_BOARD_TASK_SUCCESS",

  FETCH_LOGGED_IN_PROJECT_BOARD_TASK: "FETCH_LOGGED_IN_PROJECT_BOARD_TASK",
  FETCH_LOGGED_IN_PROJECT_BOARD_TASK_RESET: "FETCH_LOGGED_IN_PROJECT_BOARD_TASK_RESET",
  FETCH_LOGGED_IN_PROJECT_BOARD_TASK_FAILURE: "FETCH_LOGGED_IN_PROJECT_BOARD_TASK_FAILURE",
  FETCH_LOGGED_IN_PROJECT_BOARD_TASK_SUCCESS: "FETCH_LOGGED_IN_PROJECT_BOARD_TASK_SUCCESS",

  FETCH_FEATURE_PROJECT_BOARD_TASK: "FETCH_FEATURE_PROJECT_BOARD_TASK",
  FETCH_FEATURE_PROJECT_BOARD_TASK_RESET: "FETCH_FEATURE_PROJECT_BOARD_TASK_RESET",
  FETCH_FEATURE_PROJECT_BOARD_TASK_FAILURE: "FETCH_FEATURE_PROJECT_BOARD_TASK_FAILURE",
  FETCH_FEATURE_PROJECT_BOARD_TASK_SUCCESS: "FETCH_FEATURE_PROJECT_BOARD_TASK_SUCCESS",
};
