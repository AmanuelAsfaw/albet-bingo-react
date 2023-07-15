import { WeekReportActionTypes } from "./WeekReport.type";

/**
 * Fetch All WeekReport
 *
 * @param payload
 */
export const fetchAllWeekReport = (payload?: any) => ({
  type: WeekReportActionTypes.FETCH_ALL_WEEK_REPORT,
  payload: payload,
});

/**
 * Fetch All WeekReport
 *
 * @param payload
 */
export const setWeekReport = (payload?: any) => ({
  type: WeekReportActionTypes.SET_WEEK_REPORT,
  payload: payload,
});

/**
 * Reset Fetch WeekReport State
 *
 * @param payload
 */
export const fetchAllWeekReportsReset = (payload?: any) => ({
  type: WeekReportActionTypes.FETCH_ALL_WEEK_REPORT_RESET,
  payload: payload,
});
