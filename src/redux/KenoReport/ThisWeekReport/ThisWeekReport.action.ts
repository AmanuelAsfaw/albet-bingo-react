import { KenoThisWeekReportSummaryActionTypes } from "./ThisWeekReport.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_RESET,
  payload: payload,
});
