import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { BankAccountActionTypes } from "./BankAccount.type";

export function* fetchAllBankAccounts(action: any): any {
  try {
    let query = "";
    if (action.payload && Object.keys(action.payload).length > 0) {
      query =
        "?" +
        Object.keys(action.payload)
          .map((key) => `${key}=${action.payload[key]}`)
          .join("&");
    }

    const response = yield axios.get(`${API_BASE_URI}/bank_account${query}`);
    yield put({
      type: BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneBankAccounts(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/bank_account/${action.payload}`
    );
    yield put({
      type: BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllBankAccounts() {
  yield takeLatest(
    BankAccountActionTypes.FETCH_ALL_BANK_ACCOUNT,
    fetchAllBankAccounts
  );
}

export function* watcherFetchOneBankAccounts() {
  yield takeLatest(
    BankAccountActionTypes.FETCH_ONE_BANK_ACCOUNT,
    fetchOneBankAccounts
  );
}
