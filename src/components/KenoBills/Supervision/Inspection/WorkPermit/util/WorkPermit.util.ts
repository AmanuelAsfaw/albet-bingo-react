import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { WorkPermit } from "../../../../../../redux/WorkPermit/WorkPermit.type";

export type WorkPermitPropType = {
  project: ApiCallState<Project>;
  work_permit: ApiCallState<WorkPermit[]>;
  fetchAllWorkPermit: Function;
};

export type AddWorkPermitPropType = {
  project: ApiCallState<Project>;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  work_permit: ApiCallState<WorkPermit[]>;
  fetchAllWorkPermit: Function;
};

export type EditWorkPermitPropType = {
  project: ApiCallState<Project>;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  work_permit: ApiCallState<WorkPermit>;
  fetchAllWorkPermit: Function;
  fetchOneWorkPermit: Function;
  id: number;
};

export type ViewWorkPermitPropType = {
  project: ApiCallState<Project>;
  work_permit: ApiCallState<WorkPermit>;
  fetchOneWorkPermit: Function;
  id: number;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
};

export type PrintWorkPermitPropType = {
  work_permit: WorkPermit;
  project: ApiCallState<Project>;
  ref?: any;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/work-permit", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/work-permit/${id}`);
