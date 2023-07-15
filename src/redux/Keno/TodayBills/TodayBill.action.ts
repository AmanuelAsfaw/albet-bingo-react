import { KenoTodayBillActionTypes } from "./TodayBill.type";

/**
 * Fetch All KenoTodayBill
 *
 * @param payload
 */
export const fetchAllKenoTodayBill = (payload?: any) => ({
  type: KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL,
  payload: payload,
});

/**
 * Fetch All KenoTodayBill
 *
 * @param payload
 */
export const fetchOneKenoTodayBill = (payload?: any) => ({
  type: KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL,
  payload: payload,
});

/**
 * Reset Fetch KenoTodayBill State
 *
 * @param payload
 */
export const fetchAllKenoTodayBillReset = (payload?: any) => ({
  type: KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL_RESET,
  payload: payload,
});
