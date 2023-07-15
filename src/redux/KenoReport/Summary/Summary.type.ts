import { ApiCallState } from "../../Utils";

export type KenoReportSummary = {
    start_balance:string;
    end_balance:string;
    bills:number;
    games:number;
    canceled:number;
    redeemed:number;
    gain:number;
    loss:number;
};

export type KenoReportSummaryStateTypes = {
  fetchAll: ApiCallState<KenoReportSummary[]>;
  fetchOne: ApiCallState<KenoReportSummary | {}>;
};

export const KenoReportSummaryActionTypes = {
  FETCH_ALL_KENO_REPORT_SUMMARY: "FETCH_ALL_KENO_REPORT_SUMMARY",
  FETCH_ALL_KENO_REPORT_SUMMARY_RESET: "FETCH_ALL_KENO_REPORT_SUMMARY_RESET",
  FETCH_ALL_KENO_REPORT_SUMMARY_FAILURE: "FETCH_ALL_KENO_REPORT_SUMMARY_FAILURE",
  FETCH_ALL_KENO_REPORT_SUMMARY_SUCCESS: "FETCH_ALL_KENO_REPORT_SUMMARY_SUCCESS",

  FETCH_ONE_KENO_REPORT_SUMMARY: "FETCH_ONE_KENO_REPORT_SUMMARY",
  FETCH_ONE_KENO_REPORT_SUMMARY_RESET: "FETCH_ONE_KENO_REPORT_SUMMARY_RESET",
  FETCH_ONE_KENO_REPORT_SUMMARY_FAILURE: "FETCH_ONE_KENO_REPORT_SUMMARY_FAILURE",
  FETCH_ONE_KENO_REPORT_SUMMARY_SUCCESS: "FETCH_ONE_KENO_REPORT_SUMMARY_SUCCESS",
};
