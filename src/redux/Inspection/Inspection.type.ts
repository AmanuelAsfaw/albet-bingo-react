import { ApiCallState } from "../Utils";
import { InspectionForm } from "../InspectionForm/InspectionForm.type";
import { User } from "../User/User.type";

export type Inspection = {
  id: number;
  project_id: number;
  contractor_id: string;
  consultant_id: string;

  name: string;
  location: string;
  block: string;
  remark: string;
  is_fullfilled: boolean;
  is_allowed: boolean;

  contractor: User;
  consultant: User;
  inspection_items: InspectionItem[];

  createdAt: Date;
  updatedAt: Date;
};

export type InspectionItem = {
  id: number;
  inspection_id: number;

  description: string;
  is_subtitle: boolean;
  value: string;
};

export type InspectionStateTypes = {
  fetchAll: ApiCallState<Inspection[]>;
  fetchOne: ApiCallState<Inspection | {}>;
};

export const InspectionActionTypes = {
  FETCH_ONE_INSPECTION: "FETCH_ONE_INSPECTION",
  FETCH_ONE_INSPECTION_RESET: "FETCH_ONE_INSPECTION_RESET",
  FETCH_ONE_INSPECTION_FAILURE: "FETCH_ONE_INSPECTION_FAILURE",
  FETCH_ONE_INSPECTION_SUCCESS: "FETCH_ONE_INSPECTION_SUCCESS",

  FETCH_ALL_INSPECTION: "FETCH_ALL_INSPECTION",
  FETCH_ALL_INSPECTION_RESET: "FETCH_ALL_INSPECTION_RESET",
  FETCH_ALL_INSPECTION_FAILURE: "FETCH_ALL_INSPECTION_FAILURE",
  FETCH_ALL_INSPECTION_SUCCESS: "FETCH_ALL_INSPECTION_SUCCESS",
};
