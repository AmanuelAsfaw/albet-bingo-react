import { ThisWeekKenoBillActionTypes } from "./ThisWeekBill.type";

/**
 * Fetch All ThisWeekKenoBill
 *
 * @param payload
 */
export const fetchAllThisWeekKenoBill = (payload?: any) => ({
  type: ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All ThisWeekKenoBill
 *
 * @param payload
 */
export const fetchOneThisWeekKenoBill = (payload?: any) => ({
  type: ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch ThisWeekKenoBill State
 *
 * @param payload
 */
export const fetchAllThisWeekKenoBillReset = (payload?: any) => ({
  type: ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_RESET,
  payload: payload,
});
