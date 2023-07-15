import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ShareSubmittalActionTypes } from "./ShareSubmittal.type";

export function* fetchAllShareSubmittals(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/share-submittal?submittal_id=${action.payload?.submittal_id}`);
    yield put({
      type: ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneShareSubmittals(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/share-submittal/${action.payload}`
    );
    yield put({
      type: ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllShareSubmittals() {
  yield takeLatest(ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL, fetchAllShareSubmittals);
}

export function* watcherFetchOneShareSubmittals() {
  yield takeLatest(ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL, fetchOneShareSubmittals);
}
