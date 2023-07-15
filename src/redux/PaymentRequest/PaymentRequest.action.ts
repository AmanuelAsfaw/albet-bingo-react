import { PaymentRequestActionTypes } from "./PaymentRequest.type";

/**
 * Fetch All PaymentRequest
 *
 * @param payload
 */
export const fetchAllPaymentRequest = (payload?: any) => ({
  type: PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST,
  payload: payload,
});

/**
 * Fetch All PaymentRequest
 *
 * @param payload
 */
export const fetchOnePaymentRequest = (payload?: any) => ({
  type: PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST,
  payload: payload,
});

/**
 * Reset Fetch PaymentRequest State
 *
 * @param payload
 */
export const fetchAllPaymentRequestReset = (payload?: any) => ({
  type: PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST_RESET,
  payload: payload,
});
