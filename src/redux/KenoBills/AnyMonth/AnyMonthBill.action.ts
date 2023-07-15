import { AnyMonthKenoBillActionTypes } from "./AnyMonthBill.type";

/**
 * Fetch All AnyMonthKenoBill
 *
 * @param payload
 */
export const fetchAllAnyMonthKenoBill = (payload?: any) => ({
  type: AnyMonthKenoBillActionTypes.FETCH_ALL_ANY_MONTH_KENO_BILL,
  payload: payload,
});

/**
 * Fetch All AnyMonthKenoBill
 *
 * @param payload
 */
export const fetchOneAnyMonthKenoBill = (payload?: any) => ({
  type: AnyMonthKenoBillActionTypes.FETCH_ONE_ANY_MONTH_KENO_BILL,
  payload: payload,
});

/**
 * Reset Fetch AnyMonthKenoBill State
 *
 * @param payload
 */
export const fetchAllAnyMonthKenoBillReset = (payload?: any) => ({
  type: AnyMonthKenoBillActionTypes.FETCH_ALL_ANY_MONTH_KENO_BILL_RESET,
  payload: payload,
});
