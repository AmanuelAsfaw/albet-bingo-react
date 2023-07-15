import { AnyDayKenoBillActionTypes } from "./AnyDay.type";

/**
 * Fetch All AnyDayKenoBill
 *
 * @param payload
 */
export const fetchAllAnyDayKenoBill = (payload?: any) => ({
  type: AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All AnyDayKenoBill
 *
 * @param payload
 */
export const fetchOneAnyDayKenoBill = (payload?: any) => ({
  type: AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch AnyDayKenoBill State
 *
 * @param payload
 */
export const fetchAllAnyDayKenoBillReset = (payload?: any) => ({
  type: AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_RESET,
  payload: payload,
});
