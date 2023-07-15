import { BankAccountActionTypes } from "./BankAccount.type";

/**
 * Fetch All BankAccount
 *
 * @param payload
 */
export const fetchAllBankAccount = (payload?: any) => ({
  type: BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT,
  payload: payload,
});

/**
 * Fetch All BankAccount
 *
 * @param payload
 */
export const fetchOneBankAccount = (payload?: any) => ({
  type: BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT,
  payload: payload,
});

/**
 * Reset Fetch All BankAccounts State
 *
 * @param payload
 */
export const fetchAllBankAccountReset = (payload?: any) => ({
  type: BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT_RESET,
  payload: payload,
});

/**
 * Reset Fetch One BankAccount State
 *
 * @param payload
 */
export const fetchOneBankAccountReset = (payload?: any) => ({
  type: BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT_RESET,
  payload: payload,
});
