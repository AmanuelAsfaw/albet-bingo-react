import { Document } from "../Document/Document.type";
import { ApiCallState } from "../Utils";

export type SiteHandover = {
  id: number;
  project_name: string;
  contractor_name: string;
  consultant_name: string;
  client_name: string;
  location: string;
  date: string;
  user_id: number;
  project_id: number;
  createdAt: Date;
  updatedAt: Date;
  document: Document;
  share_site_handovers: ShareSiteHandoverTypes[];
};

export type ShareSiteHandoverTypes = {
  id: number;
  site_handover_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};

export type SiteHandoverStateTypes = {
  fetchAll: ApiCallState<SiteHandover[]>;
  fetchOne: ApiCallState<SiteHandover | {}>;
};

export const SiteHandoverActionTypes = {
  FETCH_ALL_SITE_HANDOVER: "FETCH_ALL_SITE_HANDOVER",
  FETCH_ALL_SITE_HANDOVER_RESET: "FETCH_ALL_SITE_HANDOVER_RESET",
  FETCH_ALL_SITE_HANDOVER_FAILURE: "FETCH_ALL_SITE_HANDOVER_FAILURE",
  FETCH_ALL_SITE_HANDOVER_SUCCESS: "FETCH_ALL_SITE_HANDOVER_SUCCESS",

  FETCH_ONE_SITE_HANDOVER: "FETCH_ONE_SITE_HANDOVER",
  FETCH_ONE_SITE_HANDOVER_RESET: "FETCH_ONE_SITE_HANDOVER_RESET",
  FETCH_ONE_SITE_HANDOVER_FAILURE: "FETCH_ONE_SITE_HANDOVER_FAILURE",
  FETCH_ONE_SITE_HANDOVER_SUCCESS: "FETCH_ONE_SITE_HANDOVER_SUCCESS",
};
