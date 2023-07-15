import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { Project } from "../../../../redux/Project/Project.type";
import { Role } from "../../../../redux/Role/Role.type";
import { User } from "../../../../redux/User/User.type";
import { ApiCallState } from "../../../../redux/Utils";

export type UserControlPropType = {
  project: ApiCallState<Project>;
  fetchOneProject: Function;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchRoles: Function;
};

export type AddUserControlPropType = {
  project: ApiCallState<Project>;
  fetchOneProject: Function;
  users: ApiCallState<User[]>;
  roles: ApiCallState<Role[]>;
};

export const Roles = [{ value: "Resident Engineer" }, { value: "RU" }];

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/project/user-control", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/project/user-control/${id}`);
