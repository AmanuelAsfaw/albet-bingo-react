import { WeeklyReportsActionTypes } from "./WeeklyReport.type";

/**
 * Fetch All WeeklyReport
 *
 * @param payload
 */
export const fetchAllWeeklyReport = (payload?: any) => ({
  type: WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS,
  payload: payload,
});

/**
 * Fetch All WeeklyReport
 *
 * @param payload
 */
export const fetchOneWeeklyReport = (payload?: any) => ({
  type: WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS,
  payload: payload,
});

/**
 * Reset Fetch WeeklyReport State
 *
 * @param payload
 */
export const fetchAllWeeklyReportReset = (payload?: any) => ({
  type: WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS_RESET,
  payload: payload,
});
