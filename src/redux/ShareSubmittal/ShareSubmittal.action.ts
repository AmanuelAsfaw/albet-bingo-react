import { ShareSubmittalActionTypes } from "./ShareSubmittal.type";

/**
 * Fetch All ShareSubmittal
 *
 * @param payload
 */
export const fetchAllShareSubmittal = (payload?: any) => ({
  type: ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL,
  payload: payload,
});

/**
 * Fetch All ShareSubmittal
 *
 * @param payload
 */
export const fetchOneShareSubmittal = (payload?: any) => ({
  type: ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL,
  payload: payload,
});

/**
 * Reset Fetch ShareSubmittal State
 *
 * @param payload
 */
export const fetchAllShareSubmittalReset = (payload?: any) => ({
  type: ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL_RESET,
  payload: payload,
});
