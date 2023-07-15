import { ApiCallState } from "../Utils";

export type BankAccount = {
  id: number;

  user_id: number;

  account_number: string;
  bank_name: string;
  is_private: boolean;
  account_type: string;
  country: string;
  currency: string;
  starting_date: Date;

  starting_balance: number;
  current_balance: number;
  reconciled_balance: number;
  unreconciled_balance: number;

  minimum_balance_warning: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type BankAccountStateTypes = {
  fetchAll: ApiCallState<BankAccount[]>;
  fetchOne: ApiCallState<BankAccount | {}>;
};

export const BankAccountActionTypes = {
  FETCH_ALL_BANK_ACCOUNT: "FETCH_ALL_BANK_ACCOUNT",
  FETCH_ALL_BANK_ACCOUNT_RESET: "FETCH_ALL_BANK_ACCOUNT_RESET",
  FETCH_ALL_BANK_ACCOUNT_FAILURE: "FETCH_ALL_BANK_ACCOUNT_FAILURE",
  FETCH_ALL_BANK_ACCOUNT_SUCCESS: "FETCH_ALL_BANK_ACCOUNT_SUCCESS",

  FETCH_ONE_BANK_ACCOUNT: "FETCH_ONE_BANK_ACCOUNT",
  FETCH_ONE_BANK_ACCOUNT_RESET: "FETCH_ONE_BANK_ACCOUNT_RESET",
  FETCH_ONE_BANK_ACCOUNT_FAILURE: "FETCH_ONE_BANK_ACCOUNT_FAILURE",
  FETCH_ONE_BANK_ACCOUNT_SUCCESS: "FETCH_ONE_BANK_ACCOUNT_SUCCESS",
};
