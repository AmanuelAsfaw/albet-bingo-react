import { ApiCallState } from "../Utils";

export type InspectionForm = {
  id: number;
  name: string;
  inspection_form_items?: InspectionFormItem[];
};

export type InspectionFormItem = {
  id: number;
  description: string;
  is_subtitle: boolean;
};

export type InspectionFormStateTypes = {
  fetchAll: ApiCallState<InspectionForm[]>;
  fetchOne: ApiCallState<InspectionForm | {}>;
};

export const InspectionFormActionTypes = {
  FETCH_ONE_INSPECTION_FORM: "FETCH_ONE_INSPECTION_FORM",
  FETCH_ONE_INSPECTION_FORM_RESET: "FETCH_ONE_INSPECTION_FORM_RESET",
  FETCH_ONE_INSPECTION_FORM_FAILURE: "FETCH_ONE_INSPECTION_FORM_FAILURE",
  FETCH_ONE_INSPECTION_FORM_SUCCESS: "FETCH_ONE_INSPECTION_FORM_SUCCESS",

  FETCH_ALL_INSPECTION_FORM: "FETCH_ALL_INSPECTION_FORM",
  FETCH_ALL_INSPECTION_FORM_RESET: "FETCH_ALL_INSPECTION_FORM_RESET",
  FETCH_ALL_INSPECTION_FORM_FAILURE: "FETCH_ALL_INSPECTION_FORM_FAILURE",
  FETCH_ALL_INSPECTION_FORM_SUCCESS: "FETCH_ALL_INSPECTION_FORM_SUCCESS",
};
