import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SiteDiaryActionTypes } from "./SiteDiary.type";

export function* fetchAllSiteDiary(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/site-diary?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSiteDiary() {
  yield takeLatest(
    SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY,
    fetchAllSiteDiary
  );
}
