import { ThisMonthKenoBillActionTypes } from "./ThisMonthBill.type";

/**
 * Fetch All ThisMonthKenoBill
 *
 * @param payload
 */
export const fetchAllThisMonthKenoBill = (payload?: any) => ({
  type: ThisMonthKenoBillActionTypes.FETCH_ALL_THIS_MONTH_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All ThisMonthKenoBill
 *
 * @param payload
 */
export const fetchOneThisMonthKenoBill = (payload?: any) => ({
  type: ThisMonthKenoBillActionTypes.FETCH_ONE_THIS_MONTH_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch ThisMonthKenoBill State
 *
 * @param payload
 */
export const fetchAllThisMonthKenoBillReset = (payload?: any) => ({
  type: ThisMonthKenoBillActionTypes.FETCH_ALL_THIS_MONTH_KENO_BILL_RESET,
  payload: payload,
});
