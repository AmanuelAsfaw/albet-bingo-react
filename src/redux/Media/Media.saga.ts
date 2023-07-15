import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MediaActionTypes } from "./Media.type";

export function* fetchAllMedias(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/media?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: MediaActionTypes.FETCH_ALL_MEDIA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MediaActionTypes.FETCH_ALL_MEDIA_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMedias() {
  yield takeLatest(MediaActionTypes.FETCH_ALL_MEDIA, fetchAllMedias);
}
