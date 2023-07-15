import { ApiCallState } from "../Utils";

export type StaffWork = {
  id: number;
  project_id: number;
  date: string;
  quality_control_managers: number;
  safety_managers: number;
  project_managers: number;
  office_engineers: number;
  construction_engineers: number;
  site_engineers: number;
  superintendents: number;
  formans: number;
  skilled_labours: number;
  daily_labours: number;
  guards: number;
  janitors: number;
  surveyors: number;
  surveyor_assistants: number;
  welders: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
};

export type StaffWorkStateTypes = {
  fetchAll: ApiCallState<StaffWork[]>;
  fetchOne: ApiCallState<StaffWork | {}>;
};

export const StaffWorkActionTypes = {
  FETCH_ALL_STAFF_WORK: "FETCH_ALL_STAFF_WORK",
  FETCH_ALL_STAFF_WORK_RESET: "FETCH_ALL_STAFF_WORK_RESET",
  FETCH_ALL_STAFF_WORK_FAILURE: "FETCH_ALL_STAFF_WORK_FAILURE",
  FETCH_ALL_STAFF_WORK_SUCCESS: "FETCH_ALL_STAFF_WORK_SUCCESS",

  FETCH_ONE_STAFF_WORK: "FETCH_ONE_STAFF_WORK",
  FETCH_ONE_STAFF_WORK_RESET: "FETCH_ONE_STAFF_WORK_RESET",
  FETCH_ONE_STAFF_WORK_FAILURE: "FETCH_ONE_STAFF_WORK_FAILURE",
  FETCH_ONE_STAFF_WORK_SUCCESS: "FETCH_ONE_STAFF_WORK_SUCCESS",
};
