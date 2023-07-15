import { KenoAnyYearReportSummaryActionTypes } from "./AnyYearReport.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_RESET,
  payload: payload,
});
