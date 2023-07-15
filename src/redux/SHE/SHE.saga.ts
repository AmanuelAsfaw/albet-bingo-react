import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SHEActionTypes } from "./SHE.type";

export function* fetchAllSHEs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/she?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: SHEActionTypes.FETCH_ALL_SHE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SHEActionTypes.FETCH_ALL_SHE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSHEs() {
  yield takeLatest(SHEActionTypes.FETCH_ALL_SHE, fetchAllSHEs);
}
