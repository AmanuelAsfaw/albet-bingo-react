import { KenoAnyWeekReportSummaryActionTypes } from "./AnyWeekReport.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_RESET,
  payload: payload,
});
