import { ApiCallState } from "../Utils";

export type Role = {
  id: number;
  name: string;
  role_accesses: RoleAccess[];
};

export type RoleAccess = {
  id?: number;
  path: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  edit: boolean;
};

export type RoleStateTypes = {
  fetchAll: ApiCallState<Role[]>;
  fetchOne: ApiCallState<Role | {}>;
};

export const RoleActionTypes = {
  FETCH_ALL_ROLE: "FETCH_ALL_ROLE",
  FETCH_ALL_ROLE_RESET: "FETCH_ALL_ROLE_RESET",
  FETCH_ALL_ROLE_FAILURE: "FETCH_ALL_ROLE_FAILURE",
  FETCH_ALL_ROLE_SUCCESS: "FETCH_ALL_ROLE_SUCCESS",

  FETCH_ONE_ROLE: "FETCH_ONE_ROLE",
  FETCH_ONE_ROLE_RESET: "FETCH_ONE_ROLE_RESET",
  FETCH_ONE_ROLE_FAILURE: "FETCH_ONE_ROLE_FAILURE",
  FETCH_ONE_ROLE_SUCCESS: "FETCH_ONE_ROLE_SUCCESS",
};
