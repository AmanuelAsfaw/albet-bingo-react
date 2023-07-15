import { ApiCallState } from "../Utils";

export type WorkPermit= {
  id: number | null;
  project_id:number | null;
  format_no:string;
  date:string;
  block:string;
  mse:string;
  work_permit_no:string;
  trade:string;
  axis:string;
  spec_ref:string;
  drawing_ref:string;
  activity_requested:string;
  submitted_name:number;
  submitted_date:string;
  received_name:number;
  received_date:string;
  allowed_to_proceed:boolean;
  refused_to_proceed:boolean;
  comment:string;
};

export type WorkPermitStateTypes = {
  fetchAll: ApiCallState<WorkPermit[]>;
  fetchOne: ApiCallState<WorkPermit | {}>;
};

export const WorkPermitActionTypes = {
  FETCH_ALL_WORK_PERMIT: "FETCH_ALL_WORK_PERMIT",
  FETCH_ALL_WORK_PERMIT_RESET: "FETCH_ALL_WORK_PERMIT_RESET",
  FETCH_ALL_WORK_PERMIT_FAILURE: "FETCH_ALL_WORK_PERMIT_FAILURE",
  FETCH_ALL_WORK_PERMIT_SUCCESS: "FETCH_ALL_WORK_PERMIT_SUCCESS",

  FETCH_ONE_WORK_PERMIT: "FETCH_ONE_WORK_PERMIT",
  FETCH_ONE_WORK_PERMIT_RESET: "FETCH_ONE_WORK_PERMIT_RESET",
  FETCH_ONE_WORK_PERMIT_FAILURE: "FETCH_ONE_WORK_PERMIT_FAILURE",
  FETCH_ONE_WORK_PERMIT_SUCCESS: "FETCH_ONE_WORK_PERMIT_SUCCESS",
};
