import { WorkPermitActionTypes } from "./WorkPermit.type";

/**
 * Fetch All WorkPermit
 *
 * @param payload
 */
export const fetchAllWorkPermit = (payload?: any) => ({
  type: WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT,
  payload: payload,
});

/**
 * Fetch All WorkPermit
 *
 * @param payload
 */
export const fetchOneWorkPermit = (payload?: any) => ({
  type: WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT,
  payload: payload,
});

/**
 * Reset Fetch WorkPermit State
 *
 * @param payload
 */
export const fetchAllWorkPermitReset = (payload?: any) => ({
  type: WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT_RESET,
  payload: payload,
});
