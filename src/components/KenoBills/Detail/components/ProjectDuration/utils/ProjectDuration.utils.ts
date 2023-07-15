import axios from "axios";
import { ApiCallState } from "../../../../../../redux/Utils";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { ProjectDuration } from "../../../../../../redux/ProjectDuration/ProjectDuration.type";

export type ProjectDurationPropType = {
  project_duration: ApiCallState<ProjectDuration[]>;
  fetchAll: Function;
};

export const sendProjectDuration = (data: any) =>
  axios.post(API_BASE_URI + "/project_duration", data);

export const deleteProjectDuration = (id: any) =>
  axios.delete(API_BASE_URI + `/project_duration/${id}`);
