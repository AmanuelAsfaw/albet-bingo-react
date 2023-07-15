import { KenoThisMonthReportSummaryActionTypes } from "./ThisMonthReport.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoThisMonthReportSummaryActionTypes.FETCH_ALL_KENO_THIS_MONTH_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoThisMonthReportSummaryActionTypes.FETCH_ONE_KENO_THIS_MONTH_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoThisMonthReportSummaryActionTypes.FETCH_ALL_KENO_THIS_MONTH_REPORT_SUMMARY_RESET,
  payload: payload,
});
