import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SiteHandoverActionTypes } from "./SiteHandover.type";

export function* fetchAllSiteHandovers(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/site-handover?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneSiteHandovers(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/site-handover/${action.payload}`
    );
    yield put({
      type: SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSiteHandovers() {
  yield takeLatest(
    SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER,
    fetchAllSiteHandovers
  );
}

export function* watcherFetchOneSiteHandovers() {
  yield takeLatest(
    SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER,
    fetchOneSiteHandovers
  );
}
