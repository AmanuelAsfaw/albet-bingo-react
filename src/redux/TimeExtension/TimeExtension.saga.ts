import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TimeExtensionActionTypes } from "./TimeExtension.type";

export function* fetchAllTimeExtensions(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/time_extension?${query}`);
    yield put({
      type: TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedTimeExtensions(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/time_extension?${query}`);
    yield put({
      type: TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTimeExtensions(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/time_extension/${action.payload}`
    );
    yield put({
      type: TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTimeExtensions() {
  yield takeLatest(
    TimeExtensionActionTypes.FETCH_ALL_TIME_EXTENSION,
    fetchAllTimeExtensions
  );
}

export function* watcherFetchPagedTimeExtensions() {
  yield takeLatest(
    TimeExtensionActionTypes.FETCH_PAGED_TIME_EXTENSION,
    fetchPagedTimeExtensions
  );
}

export function* watcherFetchOneTimeExtensions() {
  yield takeLatest(
    TimeExtensionActionTypes.FETCH_ONE_TIME_EXTENSION,
    fetchOneTimeExtensions
  );
}
