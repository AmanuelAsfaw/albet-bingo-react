import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { Role } from "../../../redux/Role/Role.type";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { StatusBoard } from "../../../redux/StatusBoard/StatusBoard/StatusBoard.type";
import { BoardProject } from "../../../redux/StatusBoard/BoardProject/BoardProject.type";

export type StatusBoardPropType = {
  projects: ApiCallState<Project[]>;
  status_board: ApiCallState<StatusBoard[]>;
  fetchProjects: Function;
  fetchStatusBoards: Function;
  fetchOneProject: Function;
  fetchUser: Function;
  // users: ApiCallState<User[]>;
  fetchRoles: Function;
};

export const InitialColumns : BoardPropType = {
  ['Projects']: {
    id: 0,
    title: 'Projects',
    items: [],
    priority: 0
  }
};
export interface TaskInterface {
  id: string;
  Task: string;
  Due_Date: string;
}

export type TaskCardPropType = {
  key: string;
  title : string;
  priority: number;
  updatedAt : string;
  id: number;
  index: number;
};

export type BoardProjectPropType = {
  key: string;
  board_id : number;
  project_id: number;
  priority: number;
  id: number;
  index: number;
};

export type BoardPropType = {
  [x: string]:{
    priority: number;
    id: number;
    title: string;
    items: BoardProject[];
  }
};

export type AddUserControlPropType = {
  project: ApiCallState<Project>;
  fetchOneProject: Function;
  users: ApiCallState<User[]>;
  roles: ApiCallState<Role[]>;
};

export type FileType = {
  uid: string;
  lastModified: Date;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type ConceptType = {
  date: Date;
  type: string;
  concept_type: string;
  description: string;
  file: FileType | string;
  project_id: number;
  uploaded_by: number;
  [key: string]: string | number | Date | FileType;
};

export const Roles = [{ value: "Resident Engineer" }, { value: "RU" }];

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/project/user-control", data);

export const DeleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/status-board/${id}`);

  
export const CreateBoard = (data: any) =>
  axios.post(API_BASE_URI + `/status-board`, data);

export const CreateProjectBoard = (data: any) =>
  axios.post(API_BASE_URI + `/project-status-board`, data);

export const UpdateBoard = (data: any) =>
axios.post(API_BASE_URI + `/project-status-board/update-board`, data);
