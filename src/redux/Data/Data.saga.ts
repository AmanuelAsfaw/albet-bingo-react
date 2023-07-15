import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { DataActionTypes } from "./Data.type";

export function* fetchAllDatas(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/data?project_id=${action.payload.project_id}`);
    yield put({
      type: DataActionTypes.FETCH_ALL_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DataActionTypes.FETCH_ALL_DATA_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneDatas(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/data/${action.payload}`
    );
    yield put({
      type: DataActionTypes.FETCH_ONE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DataActionTypes.FETCH_ONE_DATA_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllDatas() {
  yield takeLatest(DataActionTypes.FETCH_ALL_DATA, fetchAllDatas);
}

export function* watcherFetchOneDatas() {
  yield takeLatest(DataActionTypes.FETCH_ONE_DATA, fetchOneDatas);
}
