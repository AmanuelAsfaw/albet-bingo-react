import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Role, RoleAccess } from "../../../redux/Role/Role.type";
import { ApiCallState } from "../../../redux/Utils";

export type UserMatrixPropType = {
  roles: ApiCallState<Role[]>;
  fetchRoles: Function;
};

export type AddUserMatrixPropType = {
  fetchRoles: Function;
};

export type ViewUserMatrixPropType = {
  role: Role;
};

export type PrintUserMatrixPropType = {
  role: Role | null;
};

export type EditUserMatrixPropType = {
  fetchRoles: Function;
  role: Role;
};

export interface DataItem {
  key: number;
  feature: string;
  write?: boolean;
  edit?: boolean;
  read?: boolean;
  approver?: boolean;
  delete?: boolean;
  is_title: boolean;
  is_header: boolean;
  path?: string;
  id?: number;
}

export const POST = (data: any) => axios.post(`${API_BASE_URI}/role`, data);

export const DELETE = (id: number) =>
  axios.delete(`${API_BASE_URI}/role/${id}`);

export const PUT = (data: any) => axios.put(`${API_BASE_URI}/role`, data);
