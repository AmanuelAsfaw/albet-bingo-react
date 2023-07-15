import { MonthlyReportActionTypes } from "./MonthlyReport.type";

/**
 * Fetch All MonthlyReport
 *
 * @param payload
 */
export const fetchAllMonthlyReport = (payload?: any) => ({
  type: MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT,
  payload: payload,
});

export const setMonthlyReport = (payload?: any) => ({
  type: MonthlyReportActionTypes.SET_MONTHLY_REPORT,
  payload: payload,
});

/**
 * Fetch All MonthlyReport
 *
 * @param payload
 */
export const fetchOneMonthlyReport = (payload?: any) => ({
  type: MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT,
  payload: payload,
});

/**
 * Reset Fetch MonthlyReport State
 *
 * @param payload
 */
export const fetchAllMonthlyReportReset = (payload?: any) => ({
  type: MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT_RESET,
  payload: payload,
});
