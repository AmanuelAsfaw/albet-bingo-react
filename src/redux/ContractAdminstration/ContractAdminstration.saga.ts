import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ContractAdminstrationActionTypes } from "./ContractAdminstration.type";

export function* fetchAllContractAdminstrations(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/contract-adminstration?project_id=${action.payload.project_id}`);
    yield put({
      type: ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneContractAdminstrations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/contract-adminstration/${action.payload}`
    );
    yield put({
      type: ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllContractAdminstrations() {
  yield takeLatest(ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION, fetchAllContractAdminstrations);
}

export function* watcherFetchOneContractAdminstrations() {
  yield takeLatest(ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION, fetchOneContractAdminstrations);
}
