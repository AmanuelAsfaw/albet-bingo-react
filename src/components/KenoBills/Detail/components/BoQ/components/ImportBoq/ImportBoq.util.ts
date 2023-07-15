import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type ImportBoQPropType = {
  project: ApiCallState<Project>;
  fetchOneProject: Function;
};

export const saveChanges = (data: any) =>
  axios.post(API_BASE_URI + "/boq", data);
