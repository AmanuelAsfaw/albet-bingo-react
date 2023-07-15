import { KenoAnyDayReportSummaryActionTypes } from "./AnyDayReport.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoAnyDayReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoAnyDayReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoAnyDayReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_REPORT_SUMMARY_RESET,
  payload: payload,
});
