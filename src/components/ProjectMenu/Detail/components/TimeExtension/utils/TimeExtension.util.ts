import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../utilities/utilities";
import { ApiCallState } from "../../../../../../redux/Utils";
import { TimeExtension } from "../../../../../../redux/TimeExtension/TimeExtension.type";
import { Project } from "../../../../../../redux/Project/Project.type";

export type TimeExtensionPropType = {
  time_extension: ApiCallState<TimeExtension[]>;
  project: ApiCallState<Project>;
  fetchAll: Function;
  fetchOneProject: Function;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/time_extension/${id}`, authHeader());

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + `/time_extension`, data);
