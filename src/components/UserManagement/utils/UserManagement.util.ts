import { groupBy } from "lodash";
import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { RouteConstants } from "../../../router/Constants";

export type UserManagementPropType = {
  users: ApiCallState<User[]>;
  fetchUsers: Function;
};

export type AddUserManagementPropType = {
  fetchUsers: Function;
};

export type EditUserManagerPropType = {
  fetchUsers: Function;
  user: User;
};

export const POST = (data: any) => axios.post(`${API_BASE_URI}/user`, data);

export const DELETE = (id: number) =>
  axios.delete(`${API_BASE_URI}/user/${id}`);

export const PUT = (data: any) => axios.put(`${API_BASE_URI}/user`, data);

export const getAccessType = (data: string[]) => {
  let parsed: string[] = [];
  if (data.find((e) => e === "Project")) {
    parsed = [
      ...parsed,
      RouteConstants.PROJECTS,
      RouteConstants.PROJECT_LIST,
      RouteConstants.PROJECT,
      RouteConstants.REGISTER_PROJECT,
      RouteConstants.PROJECT_TAB,
      RouteConstants.PROJECT_MENU,
    ];
  }
  if (data.find((e) => e === "Task")) {
    parsed = [...parsed, RouteConstants.TASK];
  }

  if (data.find((e) => e === "Letter")) {
    parsed = [...parsed, RouteConstants.LETTER];
  }
  if (data.find((e) => e === "Planning")) {
    parsed = [...parsed, RouteConstants.PLANNING];
  }
  if (data.find((e) => e === "Communication")) {
    parsed = [...parsed, RouteConstants.COMMUNICATION];
  }
  if (data.find((e) => e === "Report")) {
    parsed = [...parsed, RouteConstants.REPORT];
  }
  return parsed;
};

export const parseType = (data: string[]) => {
  let parsed: string[] = [];

  if (data.find((e) => RouteConstants.PROJECTS === e)) {
    parsed.push(...parsed, "Project");
  }
  if (data.find((e) => RouteConstants.TASK === e)) {
    parsed.push(...parsed, "Task");
  }
  if (data.find((e) => RouteConstants.LETTER === e)) {
    parsed.push(...parsed, "Letter");
  }
  if (data.find((e) => RouteConstants.COMMUNICATION === e)) {
    parsed.push(...parsed, "Communication");
  }
  if (data.find((e) => RouteConstants.REPORT === e)) {
    parsed.push(...parsed, "Report");
  }

  return Object.keys(groupBy(parsed));
};
