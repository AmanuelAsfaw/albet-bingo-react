import { KenoReportSummaryActionTypes } from "./Summary.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY_RESET,
  payload: payload,
});
