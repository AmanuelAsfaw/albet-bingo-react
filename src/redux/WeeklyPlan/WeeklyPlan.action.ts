import { WeeklyPlanActionTypes } from "./WeeklyPlan.type";

/**
 * Fetch All WeeklyPlan
 *
 * @param payload
 */
export const fetchAllWeeklyPlan = (payload?: any) => ({
  type: WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN,
  payload: payload,
});

export const setWeeklyPlan = (payload?: any) => ({
  type: WeeklyPlanActionTypes.SET_WEEKLY_PLAN,
  payload: payload,
});

/**
 * Fetch All WeeklyPlan
 *
 * @param payload
 */
export const fetchOneWeeklyPlan = (payload?: any) => ({
  type: WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN,
  payload: payload,
});

/**
 * Reset Fetch WeeklyPlan State
 *
 * @param payload
 */
export const fetchAllWeeklyPlanReset = (payload?: any) => ({
  type: WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN_RESET,
  payload: payload,
});
