import axios from "axios";
import { ApiCallState } from "../../../../../redux/Utils";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { ProjectVariation } from "../../../../../redux/ProjectVariation/ProjectVariation.type";

export type ProjectVariationPropType = {
  project_variation: ApiCallState<ProjectVariation[]>;
  fetchAll: Function;
};

export const sendProjectVariation = (data: any) =>
  axios.post(API_BASE_URI + "/project_variation", data);

export const deleteProjectVariation = (id: any) =>
  axios.delete(API_BASE_URI + `/project_variation/${id}`);
