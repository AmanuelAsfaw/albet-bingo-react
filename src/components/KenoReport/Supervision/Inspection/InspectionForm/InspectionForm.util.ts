import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { InspectionForm } from "../../../../../redux/InspectionForm/InspectionForm.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { authHeader } from "../../../../../utilities/utilities";

export type InspectionFormPropType = {
  inspection_form: ApiCallState<InspectionForm[]>;
  fetchAllInspectionForm: Function;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/inspection_form/${id}`, authHeader());
