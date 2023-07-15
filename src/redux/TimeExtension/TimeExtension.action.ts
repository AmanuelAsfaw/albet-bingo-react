import { TimeExtensionActionTypes } from "./TimeExtension.type";

/**
 * Fetch All TimeExtension
 *
 * @param payload
 */
export const fetchAllTimeExtension = (payload?: any) => ({
  type: TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION,
  payload: payload,
});

/**
 * Fetch Paged TimeExtension
 *
 * @param payload
 */
export const fetchPagedTimeExtension = (payload?: any) => ({
  type: TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION,
  payload: payload,
});

/**
 * Fetch All TimeExtension
 *
 * @param payload
 */
export const fetchOneTimeExtension = (payload?: any) => ({
  type: TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION,
  payload: payload,
});

/**
 * Reset Fetch TimeExtension State
 *
 * @param payload
 */
export const fetchAllTimeExtensionReset = (payload?: any) => ({
  type: TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION_RESET,
  payload: payload,
});
