import { ApiCallState } from "../Utils";

export type SHE = {
  id: number;
  user_id: number;
  project_id: number;
  createdAt: Date;
  updatedAt: Date;
  sheIncidents: incident[];
  sheReports: report[];
  shePenalties: incident[];
};

export type incident = {
  id: number;
  name: string;
  job_position: string;
  age: number;
  date: string;
  type_of_injury: string;
  reason_for_incident: string;
  treatment_given: string;
  she_id: number;
  createdAt: any;
  updatedAt: any;
};

export type report = {
  id: number;
  location: string;
  correction: string;
  photos: string;
  action_by: string;
  status: string;
  she_id: number;
  createdAt: any;
  updatedAt: any;
};

export type penalty = {
  id: number;
  name: string;
  job_position: string;
  date: string;
  violation: string;
  penalty: string;
  she_id: number;
  createdAt: any;
  updatedAt: any;
};

export type SHEStateTypes = {
  fetchAll: ApiCallState<SHE[]>;
};

export const SHEActionTypes = {
  FETCH_ALL_SHE: "FETCH_ALL_SHE",
  FETCH_ALL_SHE_RESET: "FETCH_ALL_SHE_RESET",
  FETCH_ALL_SHE_FAILURE: "FETCH_ALL_SHE_FAILURE",
  FETCH_ALL_SHE_SUCCESS: "FETCH_ALL_SHE_SUCCESS",
};
