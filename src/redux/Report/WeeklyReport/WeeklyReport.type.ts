import { ApiCallState } from "../../Utils";
import { WeeklyReportDetail } from "../WeeklyReoprtDetails/WeeklyReoprtDetails.type";

export type WeeklyReport = {
  id: number | null;
  project_id: number;
  project_name: string;
  week: string;
  details : WeeklyReportDetail[];
};

export type WeeklyReportsStateTypes = {
  fetchAll: ApiCallState<WeeklyReport[]>;
  fetchOne: ApiCallState<WeeklyReport | {}>;
};

export const WeeklyReportsActionTypes = {
  FETCH_ALL_WEEKLY_REPORTS: "FETCH_ALL_WEEKLY_REPORTS",
  FETCH_ALL_WEEKLY_REPORTS_RESET: "FETCH_ALL_WEEKLY_REPORTS_RESET",
  FETCH_ALL_WEEKLY_REPORTS_FAILURE: "FETCH_ALL_WEEKLY_REPORTS_FAILURE",
  FETCH_ALL_WEEKLY_REPORTS_SUCCESS: "FETCH_ALL_WEEKLY_REPORTS_SUCCESS",

  FETCH_ONE_WEEKLY_REPORTS: "FETCH_ONE_WEEKLY_REPORTS",
  FETCH_ONE_WEEKLY_REPORTS_RESET: "FETCH_ONE_WEEKLY_REPORTS_RESET",
  FETCH_ONE_WEEKLY_REPORTS_FAILURE: "FETCH_ONE_WEEKLY_REPORTS_FAILURE",
  FETCH_ONE_WEEKLY_REPORTS_SUCCESS: "FETCH_ONE_WEEKLY_REPORTS_SUCCESS",
};
