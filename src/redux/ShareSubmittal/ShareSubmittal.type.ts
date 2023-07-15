import { ApiCallState } from "../Utils";

export type ShareSubmittal= {
  id: number;
  project_id:number;
  sumittal_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};

export type ShareSubmittalStateTypes = {
  fetchAll: ApiCallState<ShareSubmittal[]>;
  fetchOne: ApiCallState<ShareSubmittal | {}>;
};

export const ShareSubmittalActionTypes = {
  FETCH_ALL_SHARE_SUBMITTAL: "FETCH_ALL_SHARE_SUBMITTAL",
  FETCH_ALL_SHARE_SUBMITTAL_RESET: "FETCH_ALL_SHARE_SUBMITTAL_RESET",
  FETCH_ALL_SHARE_SUBMITTAL_FAILURE: "FETCH_ALL_SHARE_SUBMITTAL_FAILURE",
  FETCH_ALL_SHARE_SUBMITTAL_SUCCESS: "FETCH_ALL_SHARE_SUBMITTAL_SUCCESS",

  FETCH_ONE_SHARE_SUBMITTAL: "FETCH_ONE_SHARE_SUBMITTAL",
  FETCH_ONE_SHARE_SUBMITTAL_RESET: "FETCH_ONE_SHARE_SUBMITTAL_RESET",
  FETCH_ONE_SHARE_SUBMITTAL_FAILURE: "FETCH_ONE_SHARE_SUBMITTAL_FAILURE",
  FETCH_ONE_SHARE_SUBMITTAL_SUCCESS: "FETCH_ONE_SHARE_SUBMITTAL_SUCCESS",
};
