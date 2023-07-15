import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../ApiCall";
import { LogActionTypes } from "./Log.type";

export function* fetchAllLog(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/log`);
    yield put({
      type: LogActionTypes.FETCH_ALL_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LogActionTypes.FETCH_ALL_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneLog(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/log/${action.payload}`);
    yield put({
      type: LogActionTypes.FETCH_ONE_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LogActionTypes.FETCH_ONE_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllLog() {
  yield takeLatest(LogActionTypes.FETCH_ALL_LOG, fetchAllLog);
}

export function* watcherFetchOneLog() {
  yield takeLatest(LogActionTypes.FETCH_ONE_LOG, fetchOneLog);
}
