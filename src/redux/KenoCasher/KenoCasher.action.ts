import { KenoCasherActionTypes } from "./KenoCasher.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoCasherActionTypes.FETCH_ALL_KENO_CASHER,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoCasherActionTypes.FETCH_ONE_KENO_CASHER,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoCasherActionTypes.FETCH_ALL_KENO_CASHER_RESET,
  payload: payload,
});
