import { TodayKenoBillActionTypes } from "./Today.type";

/**
 * Fetch All TodayKenoBill
 *
 * @param payload
 */
export const fetchAllTodayKenoBill = (payload?: any) => ({
  type: TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All TodayKenoBill
 *
 * @param payload
 */
export const fetchOneTodayKenoBill = (payload?: any) => ({
  type: TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch TodayKenoBill State
 *
 * @param payload
 */
export const fetchAllTodayKenoBillReset = (payload?: any) => ({
  type: TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_RESET,
  payload: payload,
});
