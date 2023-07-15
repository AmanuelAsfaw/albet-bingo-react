import { DataActionTypes } from "./Data.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: DataActionTypes.FETCH_ALL_DATA,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: DataActionTypes.FETCH_ONE_DATA,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: DataActionTypes.FETCH_ALL_DATA_RESET,
  payload: payload,
});
