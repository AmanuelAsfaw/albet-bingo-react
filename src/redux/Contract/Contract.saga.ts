import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ContractActionTypes } from "./Contract.type";

export function* fetchAllContracts(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/contract`);
    yield put({
      type: ContractActionTypes.FETCH_ALL_CONTRACT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ContractActionTypes.FETCH_ALL_CONTRACT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneContract(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/contract/${action.payload}`
    );
    yield put({
      type: ContractActionTypes.FETCH_ONE_CONTRACT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ContractActionTypes.FETCH_ONE_CONTRACT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllContracts() {
  yield takeLatest(ContractActionTypes.FETCH_ALL_CONTRACT, fetchAllContracts);
}

export function* watcherFetchOneContract() {
  yield takeLatest(ContractActionTypes.FETCH_ONE_CONTRACT, fetchOneContract);
}
