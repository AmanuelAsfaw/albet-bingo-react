import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { ProjectTaskCategory } from "../../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type ProjectTaskCatagoryPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  category_list: ApiCallState<ProjectTaskCategory[]>;
  fetchAllCatagory: Function;
};

export type AddProjectTAskCategoryPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchAllProjectTaskCategory: Function;
};


export type EditProjectTAskCategoryPropType = {
  project: ApiCallState<Project>;
  category: ProjectTaskCategory;
  fetchAllProjectTaskCategory: Function;
  fetchOneProjectTAskCategory: Function;
};

export type StatusPropType = {
  expiry_date: string;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/project-task-category", data, {
    headers: {
      // "Content-Type": "multipart/form-data",
    },
  });

export const sendUpdateData = (data: any) =>
  axios.put(API_BASE_URI + "/project-task-category", data, {
    headers: {
      // "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/project-task-category/${id}`);