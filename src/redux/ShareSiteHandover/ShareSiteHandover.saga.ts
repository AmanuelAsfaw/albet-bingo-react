import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ShareSiteHandoverActionTypes } from "./ShareSiteHandover.type";

export function* fetchAllShareSiteHandovers(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/share-site-handover?site_handover_id=${action.payload?.site_handover}`);
    yield put({
      type: ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneShareSiteHandovers(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/share-site-handover/${action.payload}`
    );
    yield put({
      type: ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllShareSiteHandovers() {
  yield takeLatest(ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER, fetchAllShareSiteHandovers);
}

export function* watcherFetchOneShareSiteHandovers() {
  yield takeLatest(ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER, fetchOneShareSiteHandovers);
}
