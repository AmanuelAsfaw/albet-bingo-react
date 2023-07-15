import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { DesignChangeLogActionTypes } from "./DesignChangeLog.type";

export function* fetchAllDesignChangeLogs(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/design_change_log?${query}`
    );
    yield put({
      type: DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedDesignChangeLogs(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/design_change_log?${query}`
    );
    yield put({
      type: DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneDesignChangeLogs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/design_change_log/${action.payload}`
    );
    yield put({
      type: DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllDesignChangeLogs() {
  yield takeLatest(
    DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG,
    fetchAllDesignChangeLogs
  );
}

export function* watcherFetchPagedDesignChangeLogs() {
  yield takeLatest(
    DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG,
    fetchPagedDesignChangeLogs
  );
}

export function* watcherFetchOneDesignChangeLogs() {
  yield takeLatest(
    DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG,
    fetchOneDesignChangeLogs
  );
}
