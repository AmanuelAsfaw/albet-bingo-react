import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ConsultantActionTypes } from "./Consultant.type";

export function* fetchAllConsultants(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/consultant`);
    yield put({
      type: ConsultantActionTypes.FETCH_ALL_CONSULTANT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ConsultantActionTypes.FETCH_ALL_CONSULTANT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllConsultants() {
  yield takeLatest(
    ConsultantActionTypes.FETCH_ALL_CONSULTANT,
    fetchAllConsultants
  );
}
