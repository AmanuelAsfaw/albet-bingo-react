import { PaymentsActionTypes } from "./Payments.type";

/**
 * Fetch All Payments
 *
 * @param payload
 */
export const fetchAllPayments = (payload?: any) => ({
  type: PaymentsActionTypes.FETCH_ALL_PAYMENTS,
  payload: payload,
});

/**
 * Fetch All Payments
 *
 * @param payload
 */
export const fetchOnePayments = (payload?: any) => ({
  type: PaymentsActionTypes.FETCH_ONE_PAYMENTS,
  payload: payload,
});

/**
 * Reset Fetch Payments State
 *
 * @param payload
 */
export const fetchAllPaymentsReset = (payload?: any) => ({
  type: PaymentsActionTypes.FETCH_ALL_PAYMENTS_RESET,
  payload: payload,
});
