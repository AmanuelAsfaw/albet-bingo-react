import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ShareDataActionTypes } from "./ShareData.type";

export function* fetchAllShareDatas(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/share-data?data_id=${action.payload?.data_id}`);
    yield put({
      type: ShareDataActionTypes.FETCH_ALL_SHARE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareDataActionTypes.FETCH_ALL_SHARE_DATA_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneShareDatas(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/share-data/${action.payload}`
    );
    yield put({
      type: ShareDataActionTypes.FETCH_ONE_SHARE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareDataActionTypes.FETCH_ONE_SHARE_DATA_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllShareDatas() {
  yield takeLatest(ShareDataActionTypes.FETCH_ALL_SHARE_DATA, fetchAllShareDatas);
}

export function* watcherFetchOneShareDatas() {
  yield takeLatest(ShareDataActionTypes.FETCH_ONE_SHARE_DATA, fetchOneShareDatas);
}
