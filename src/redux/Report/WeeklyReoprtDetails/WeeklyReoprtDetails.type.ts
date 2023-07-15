import { ApiCallState } from "../../Utils";

export type WeeklyReportDetail = {
  id: number | null;
  weekly_site_report_id: number;
  block: string;
  planned: string;
  progress: string;
  status: string;
  issue: string;
  solution: string;
  remark: string;
  photo: string;
};

export type WeeklyReportDetailsStateTypes = {
  fetchAll: ApiCallState<WeeklyReportDetail[]>;
  fetchOne: ApiCallState<WeeklyReportDetail | {}>;
};

export const WeeklyReportDetailsActionTypes = {
  FETCH_ALL_WEEKLY_REPORT_DETAILS: "FETCH_ALL_WEEKLY_REPORT_DETAILS",
  FETCH_ALL_WEEKLY_REPORT_DETAILS_RESET: "FETCH_ALL_WEEKLY_REPORT_DETAILS_RESET",
  FETCH_ALL_WEEKLY_REPORT_DETAILS_FAILURE: "FETCH_ALL_WEEKLY_REPORT_DETAILS_FAILURE",
  FETCH_ALL_WEEKLY_REPORT_DETAILS_SUCCESS: "FETCH_ALL_WEEKLY_REPORT_DETAILS_SUCCESS",

  FETCH_ONE_WEEKLY_REPORT_DETAILS: "FETCH_ONE_WEEKLY_REPORT_DETAILS",
  FETCH_ONE_WEEKLY_REPORT_DETAILS_RESET: "FETCH_ONE_WEEKLY_REPORT_DETAILS_RESET",
  FETCH_ONE_WEEKLY_REPORT_DETAILS_FAILURE: "FETCH_ONE_WEEKLY_REPORT_DETAILS_FAILURE",
  FETCH_ONE_WEEKLY_REPORT_DETAILS_SUCCESS: "FETCH_ONE_WEEKLY_REPORT_DETAILS_SUCCESS",
};
