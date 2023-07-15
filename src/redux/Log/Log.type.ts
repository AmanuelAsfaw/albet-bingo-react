import { Project } from "../Project/Project.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Log = {
  id: number;
  table: string;
  action: string;
  description: string;
  date: string;
  project_id: number;
  user_id: number;
  project: Project;
  user: User;
};

export type LogStateTypes = {
  fetchAll: ApiCallState<Log[]>;
  fetchOne: ApiCallState<Log | {}>;
};

export const LogActionTypes = {
  FETCH_ALL_LOG: "FETCH_ALL_LOG",
  FETCH_ALL_LOG_RESET: "FETCH_ALL_LOG_RESET",
  FETCH_ALL_LOG_FAILURE: "FETCH_ALL_LOG_FAILURE",
  FETCH_ALL_LOG_SUCCESS: "FETCH_ALL_LOG_SUCCESS",

  FETCH_ONE_LOG: "FETCH_ONE_LOG",
  FETCH_ONE_LOG_RESET: "FETCH_ONE_LOG_RESET",
  FETCH_ONE_LOG_FAILURE: "FETCH_ONE_LOG_FAILURE",
  FETCH_ONE_LOG_SUCCESS: "FETCH_ONE_LOG_SUCCESS",
};
