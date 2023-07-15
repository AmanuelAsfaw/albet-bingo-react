import { PaymentFileActionTypes } from "./PaymentFile.type";

/**
 * Fetch All PaymentFile
 *
 * @param payload
 */
export const fetchAllPaymentFile = (payload?: any) => ({
  type: PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE,
  payload: payload,
});

/**
 * Fetch All PaymentFile
 *
 * @param payload
 */
export const fetchOnePaymentFile = (payload?: any) => ({
  type: PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE,
  payload: payload,
});

/**
 * Reset Fetch PaymentFile State
 *
 * @param payload
 */
export const fetchAllPaymentFileReset = (payload?: any) => ({
  type: PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE_RESET,
  payload: payload,
});
