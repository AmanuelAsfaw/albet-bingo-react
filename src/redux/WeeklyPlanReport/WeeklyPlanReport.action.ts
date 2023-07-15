import { WeeklyPlanReportActionTypes } from "./WeeklyPlanReport.type";

/**
 * Fetch All WeeklyPlanReport
 *
 * @param payload
 */
export const fetchAllWeeklyPlanReport = (payload?: any) => ({
  type: WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT,
  payload: payload,
});

/**
 * Fetch Paged WeeklyPlanReport
 *
 * @param payload
 */
export const fetchPagedWeeklyPlanReport = (payload?: any) => ({
  type: WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT,
  payload: payload,
});

/**
 * Fetch All WeeklyPlanReport
 *
 * @param payload
 */
export const fetchOneWeeklyPlanReport = (payload?: any) => ({
  type: WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT,
  payload: payload,
});

/**
 * Reset Fetch WeeklyPlanReport State
 *
 * @param payload
 */
export const fetchAllWeeklyPlanReportReset = (payload?: any) => ({
  type: WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT_RESET,
  payload: payload,
});
