import { ApiCallState } from "../Utils";

export type ShareSiteHandover= {
    id: number;
    project_id:number;
    site_handover_id: number;
    user_id: number;
    remark: string;
    createdAt: string;
};

export type ShareSiteHandoverStateTypes = {
  fetchAll: ApiCallState<ShareSiteHandover[]>;
  fetchOne: ApiCallState<ShareSiteHandover | {}>;
};

export const ShareSiteHandoverActionTypes = {
  FETCH_ALL_SHARE_SITE_HANDOVER: "FETCH_ALL_SHARE_SITE_HANDOVER",
  FETCH_ALL_SHARE_SITE_HANDOVER_RESET: "FETCH_ALL_SHARE_SITE_HANDOVER_RESET",
  FETCH_ALL_SHARE_SITE_HANDOVER_FAILURE: "FETCH_ALL_SHARE_SITE_HANDOVER_FAILURE",
  FETCH_ALL_SHARE_SITE_HANDOVER_SUCCESS: "FETCH_ALL_SHARE_SITE_HANDOVER_SUCCESS",

  FETCH_ONE_SHARE_SITE_HANDOVER: "FETCH_ONE_SHARE_SITE_HANDOVER",
  FETCH_ONE_SHARE_SITE_HANDOVER_RESET: "FETCH_ONE_SHARE_SITE_HANDOVER_RESET",
  FETCH_ONE_SHARE_SITE_HANDOVER_FAILURE: "FETCH_ONE_SHARE_SITE_HANDOVER_FAILURE",
  FETCH_ONE_SHARE_SITE_HANDOVER_SUCCESS: "FETCH_ONE_SHARE_SITE_HANDOVER_SUCCESS",
};
