import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Inspection } from "../../../../../redux/Inspection/Inspection.type";
import { InspectionForm } from "../../../../../redux/InspectionForm/InspectionForm.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { authHeader } from "../../../../../utilities/utilities";

export type InspectionPropType = {
  inspection: ApiCallState<Inspection[]>;
  project: ApiCallState<Project>;
  inspection_forms: ApiCallState<InspectionForm[]> | undefined;
  fetchAllInspection: Function;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/inspection/${id}`, authHeader());
