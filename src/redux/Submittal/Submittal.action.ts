import { SubmittalActionTypes } from "./Submittal.type";

/**
 * Fetch All Submittal
 *
 * @param payload
 */
export const fetchAllSubmittal = (payload?: any) => ({
  type: SubmittalActionTypes.FETCH_ALL_SUBMITTAL,
  payload: payload,
});

/**
 * Fetch All Submittal
 *
 * @param payload
 */
export const fetchOneSubmittal = (payload?: any) => ({
  type: SubmittalActionTypes.FETCH_ONE_SUBMITTAL,
  payload: payload,
});

/**
 * Reset Fetch Submittal State
 *
 * @param payload
 */
export const fetchAllSubmittalReset = (payload?: any) => ({
  type: SubmittalActionTypes.FETCH_ALL_SUBMITTAL_RESET,
  payload: payload,
});
