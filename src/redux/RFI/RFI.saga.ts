import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { RFIActionTypes } from "./RFI.type";

export function* fetchAllRFIs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/rfi?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: RFIActionTypes.FETCH_ALL_RFI_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RFIActionTypes.FETCH_ALL_RFI_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllRFIs() {
  yield takeLatest(RFIActionTypes.FETCH_ALL_RFI, fetchAllRFIs);
}
