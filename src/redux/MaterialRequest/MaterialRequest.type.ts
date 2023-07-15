import { ApiCallState } from "../Utils";

export type MaterialRequest = {
  id: number;
  date: string;
  parcel_no: string;
  block_no: string;
  block_type: string;
  personnel_equipment: string;
  contractor_name: string;
  site_inspector_name: string;
  resident_engineer_name: string;
  project_coordinator_name: string;
  shde_head_name: string;
};

export type MaterialRequestStateTypes = {
  fetchAll: ApiCallState<MaterialRequest[]>;
  fetchOne: ApiCallState<MaterialRequest | {}>;
};

export const MaterialRequestActionTypes = {
  FETCH_ALL_MATERIAL_REQUEST: "FETCH_ALL_MATERIAL_REQUEST",
  FETCH_ALL_MATERIAL_REQUEST_RESET: "FETCH_ALL_MATERIAL_REQUEST_RESET",
  FETCH_ALL_MATERIAL_REQUEST_FAILURE: "FETCH_ALL_MATERIAL_REQUEST_FAILURE",
  FETCH_ALL_MATERIAL_REQUEST_SUCCESS: "FETCH_ALL_MATERIAL_REQUEST_SUCCESS",

  FETCH_ONE_MATERIAL_REQUEST: "FETCH_ONE_MATERIAL_REQUEST",
  FETCH_ONE_MATERIAL_REQUEST_RESET: "FETCH_ONE_MATERIAL_REQUEST_RESET",
  FETCH_ONE_MATERIAL_REQUEST_FAILURE: "FETCH_ONE_MATERIAL_REQUEST_FAILURE",
  FETCH_ONE_MATERIAL_REQUEST_SUCCESS: "FETCH_ONE_MATERIAL_REQUEST_SUCCESS",
};
