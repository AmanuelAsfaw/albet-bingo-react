import { AnyWeekKenoBillActionTypes } from "./AnyWeekBill.type";

/**
 * Fetch All AnyWeekKenoBill
 *
 * @param payload
 */
export const fetchAllAnyWeekKenoBill = (payload?: any) => ({
  type: AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All AnyWeekKenoBill
 *
 * @param payload
 */
export const fetchOneAnyWeekKenoBill = (payload?: any) => ({
  type: AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch AnyWeekKenoBill State
 *
 * @param payload
 */
export const fetchAllAnyWeekKenoBillReset = (payload?: any) => ({
  type: AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_RESET,
  payload: payload,
});
