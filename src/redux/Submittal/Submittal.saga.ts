import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SubmittalActionTypes } from "./Submittal.type";

export function* fetchAllSubmittals(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/submittal?project_id=${action.payload.project_id}`);
    yield put({
      type: SubmittalActionTypes.FETCH_ALL_SUBMITTAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SubmittalActionTypes.FETCH_ALL_SUBMITTAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneSubmittals(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/submittal/${action.payload}`
    );
    yield put({
      type: SubmittalActionTypes.FETCH_ONE_SUBMITTAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SubmittalActionTypes.FETCH_ONE_SUBMITTAL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSubmittals() {
  yield takeLatest(SubmittalActionTypes.FETCH_ALL_SUBMITTAL, fetchAllSubmittals);
}

export function* watcherFetchOneSubmittals() {
  yield takeLatest(SubmittalActionTypes.FETCH_ONE_SUBMITTAL, fetchOneSubmittals);
}
