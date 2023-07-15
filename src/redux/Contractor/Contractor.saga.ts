import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ContractorActionTypes } from "./Contractor.type";

export function* fetchAllContractors(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/contractor`);
    yield put({
      type: ContractorActionTypes.FETCH_ALL_CONTRACTOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ContractorActionTypes.FETCH_ALL_CONTRACTOR_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllContractors() {
  yield takeLatest(
    ContractorActionTypes.FETCH_ALL_CONTRACTOR,
    fetchAllContractors
  );
}
