import { StaffWorkActionTypes } from "./StaffWork.type";

/**
 * Fetch All StaffWork
 *
 * @param payload
 */
export const fetchAllStaffWork = (payload?: any) => ({
  type: StaffWorkActionTypes.FETCH_ALL_STAFF_WORK,
  payload: payload,
});

/**
 * Fetch All StaffWork
 *
 * @param payload
 */
export const fetchOneStaffWork = (payload?: any) => ({
  type: StaffWorkActionTypes.FETCH_ONE_STAFF_WORK,
  payload: payload,
});

/**
 * Reset Fetch StaffWork State
 *
 * @param payload
 */
export const fetchAllStaffWorkReset = (payload?: any) => ({
  type: StaffWorkActionTypes.FETCH_ALL_STAFF_WORK_RESET,
  payload: payload,
});
