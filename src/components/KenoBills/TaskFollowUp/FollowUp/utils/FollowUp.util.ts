import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { Role } from "../../../../../redux/Role/Role.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { StatusBoard } from "../../../../../redux/StatusBoard/StatusBoard/StatusBoard.type";
import { BoardProject } from "../../../../../redux/StatusBoard/BoardProject/BoardProject.type";
import { ProjectTaskCategory } from "../../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.type";
import { ProjectCategoryBoard } from "../../../../../redux/TaskFollowUp/ProjectCategoryBoard/ProjectCategoryBoard.type";
import { ProjectBoardTask } from "../../../../../redux/TaskFollowUp/ProjectBoardTask/ProjectBoardTask.type";

export type ProjectTaskBoardPropType = {
  categorys: ApiCallState<ProjectTaskCategory[]>;
  project_category_board: ApiCallState<ProjectCategoryBoard[]>;
  fetchProjectTaskBoards: Function;
  fetchOneProject: Function;
  fetchUser: Function;
  // users: ApiCallState<User[]>;
  fetchRoles: Function;
};

export const InitialColumns: BoardPropType = {
  ["Item-Board"]: {
    id: 0,
    title: "Item-Board",
    items: [],
    priority: 0,
  },
};
export interface TaskInterface {
  id: string;
  Task: string;
  Due_Date: string;
}

export type TaskCardPropType = {
  key: string;
  title: string;
  priority: number;
  updatedAt: string;
  id: number;
  index: number;
  fetchStatusBoardAll : Function;
  category_id: number;
};

export type BoardProjectPropType = {
  key: string;
  board_id: number;
  project_id: number;
  priority: number;
  id: number;
  index: number;
};

export type BoardPropType = {
  [x: string]: {
    priority: number;
    id: number;
    title: string;
    items: ProjectBoardTask[];
  };
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
  axios.delete(API_BASE_URI + `/project-category-board/${id}`);

export const CreateBoard = (data: any) =>
  axios.post(API_BASE_URI + `/project-category-board`, data);

export const CreateProjectBoardTask = (data: any) =>
  axios.post(API_BASE_URI + `/project-board-task`, data);

export const UpdateProjectBoardTask = (data: any, id: any) =>
  axios.put(API_BASE_URI + `/project-board-task/${id}`, data);

export const UpdateBoard = (data: any) =>
  axios.post(API_BASE_URI + `/project-board-task/update-board`, data);
