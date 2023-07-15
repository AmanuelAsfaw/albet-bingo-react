import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { InspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";

import { ApiCallState } from "../../../../../../redux/Utils";
import { authHeader } from "../../../../../../utilities/utilities";

export type RequestInspectionPropType = {
  fetchAllInspectionForm: Function;
  fetchAllInspection: Function;
  fetchAllUser: Function;
  project: ApiCallState<Project>;
  inspectionForms: ApiCallState<InspectionForm[]>;
  inspectionFormItems: ApiCallState<InspectionForm>;
  users: ApiCallState<User[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/inspection", data, authHeader());
