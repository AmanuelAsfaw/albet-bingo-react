import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { InspectionForm } from "../../../../../../redux/InspectionForm/InspectionForm.type";
import { authHeader } from "../../../../../../utilities/utilities";

export type EditInspectionFormPropType = {
  inspection_form: InspectionForm;
  fetchAllInspectionForm: Function;
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/inspection_form", data, authHeader());
