import { ApiCallState } from "../Utils";

export type ShareData= {
  id: number;
  project_id:number;
  data_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};

export type ShareDataStateTypes = {
  fetchAll: ApiCallState<ShareData[]>;
  fetchOne: ApiCallState<ShareData | {}>;
};

export const ShareDataActionTypes = {
  FETCH_ALL_SHARE_DATA: "FETCH_ALL_SHARE_DATA",
  FETCH_ALL_SHARE_DATA_RESET: "FETCH_ALL_SHARE_DATA_RESET",
  FETCH_ALL_SHARE_DATA_FAILURE: "FETCH_ALL_SHARE_DATA_FAILURE",
  FETCH_ALL_SHARE_DATA_SUCCESS: "FETCH_ALL_SHARE_DATA_SUCCESS",

  FETCH_ONE_SHARE_DATA: "FETCH_ONE_SHARE_DATA",
  FETCH_ONE_SHARE_DATA_RESET: "FETCH_ONE_SHARE_DATA_RESET",
  FETCH_ONE_SHARE_DATA_FAILURE: "FETCH_ONE_SHARE_DATA_FAILURE",
  FETCH_ONE_SHARE_DATA_SUCCESS: "FETCH_ONE_SHARE_DATA_SUCCESS",
};
