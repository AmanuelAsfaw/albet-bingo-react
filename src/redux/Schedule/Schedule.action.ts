import { ScheduleActionTypes } from "./Schedule.type";

/**
 * Fetch All Schedules
 *
 * @param payload
 */
export const fetchAllSchedules = (payload?: any) => ({
  type: ScheduleActionTypes.FETCH_ALL_SCHEDULE,
  payload: payload,
});

/**
 * Reset Fetch Schedules State
 *
 * @param payload
 */
export const fetchAllSchedulesReset = (payload?: any) => ({
  type: ScheduleActionTypes.FETCH_ALL_SCHEDULE_RESET,
  payload: payload,
});
