import { ApiCallState } from "../Utils";

export type ShareInspection= {
  id: number;
  project_id:number;
  document_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};

export type ShareInspectionStateTypes = {
  fetchAll: ApiCallState<ShareInspection[]>;
  fetchOne: ApiCallState<ShareInspection | {}>;
};

export const ShareInspectionActionTypes = {
  FETCH_ALL_SHARE_INSPECTION: "FETCH_ALL_SHARE_INSPECTION",
  FETCH_ALL_SHARE_INSPECTION_RESET: "FETCH_ALL_SHARE_INSPECTION_RESET",
  FETCH_ALL_SHARE_INSPECTION_FAILURE: "FETCH_ALL_SHARE_INSPECTION_FAILURE",
  FETCH_ALL_SHARE_INSPECTION_SUCCESS: "FETCH_ALL_SHARE_INSPECTION_SUCCESS",

  FETCH_ONE_SHARE_INSPECTION: "FETCH_ONE_SHARE_INSPECTION",
  FETCH_ONE_SHARE_INSPECTION_RESET: "FETCH_ONE_SHARE_INSPECTION_RESET",
  FETCH_ONE_SHARE_INSPECTION_FAILURE: "FETCH_ONE_SHARE_INSPECTION_FAILURE",
  FETCH_ONE_SHARE_INSPECTION_SUCCESS: "FETCH_ONE_SHARE_INSPECTION_SUCCESS",
};
