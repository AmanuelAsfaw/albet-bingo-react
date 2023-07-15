import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ShareInspectionActionTypes } from "./ShareInspection.type";

export function* fetchAllShareInspections(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/share-inspection?document_id=${action.payload?.document_id}`);
    yield put({
      type: ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneShareInspections(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/share-inspection/${action.payload}`
    );
    yield put({
      type: ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllShareInspections() {
  yield takeLatest(ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION, fetchAllShareInspections);
}

export function* watcherFetchOneShareInspections() {
  yield takeLatest(ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION, fetchOneShareInspections);
}
