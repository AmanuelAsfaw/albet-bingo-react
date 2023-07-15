import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Inspection } from "../../../../../../redux/Inspection/Inspection.type";
import { InspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { authHeader } from "../../../../../../utilities/utilities";

export type EditInspectionPropType = {
  fetchAllInspection: Function;
  project: ApiCallState<Project>;
  inspection: Inspection;
};

export const sendData = (id: any, data: any) =>
  axios.put(API_BASE_URI + `/inspection/edit/${id}`, data, authHeader());
