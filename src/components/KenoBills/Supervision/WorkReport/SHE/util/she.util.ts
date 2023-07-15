import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { SHE } from "../../../../../../redux/SHE/SHE.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { authHeader } from "../../../../../../utilities/utilities";

export type SHEPropType = {
  project: ApiCallState<Project>;
  she: ApiCallState<SHE[]>;
  fetchStaff: Function;
  fetchLabour: Function;
  fetchSHE: Function;
};

export type AddSHEPropType = {
  project: ApiCallState<Project>;
  fetchSHE: Function;
};

export type ViewSHEPropType = {
  she: SHE;
};

export type PrintSHEPropType = {
  ref?: any;
  she: SHE;
};

export const addSHE = (data: any) =>
  axios.post(API_BASE_URI + "/she", data, authHeader());
