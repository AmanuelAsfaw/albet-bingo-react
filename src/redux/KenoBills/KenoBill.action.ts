import { KenoBillActionTypes } from "./KenoBill.type";

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchAllData = (payload?: any) => ({
  type: KenoBillActionTypes.FETCH_ALL_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All Data
 *
 * @param payload
 */
export const fetchOneData = (payload?: any) => ({
  type: KenoBillActionTypes.FETCH_ONE_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch Data State
 *
 * @param payload
 */
export const fetchAllDataReset = (payload?: any) => ({
  type: KenoBillActionTypes.FETCH_ALL_KENO_BILL_RESET,
  payload: payload,
});
