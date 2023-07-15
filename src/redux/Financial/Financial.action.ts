import { FinancialActionTypes } from "./Financial.type";

/**
 * Fetch All Financial
 *
 * @param payload
 */
export const fetchAllFinancial = (payload?: any) => ({
  type: FinancialActionTypes.FETCH_ALL_FINANCIAL,
  payload: payload,
});

/**
 * Fetch Paged Financial
 *
 * @param payload
 */
export const fetchPagedFinancial = (payload?: any) => ({
  type: FinancialActionTypes.FETCH_PAGED_FINANCIAL,
  payload: payload,
});

/**
 * Fetch All Financial
 *
 * @param payload
 */
export const fetchOneFinancial = (payload?: any) => ({
  type: FinancialActionTypes.FETCH_ONE_FINANCIAL,
  payload: payload,
});

/**
 * Reset Fetch Financial State
 *
 * @param payload
 */
export const fetchAllFinancialReset = (payload?: any) => ({
  type: FinancialActionTypes.FETCH_ALL_FINANCIAL_RESET,
  payload: payload,
});
