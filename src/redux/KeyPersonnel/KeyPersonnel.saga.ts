import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { KeyPersonnelActions } from "./KeyPersonnel.type";

export function* fetchKeyPersonnel(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys
        .map((key) => {
          if (action.payload[key]) {
            return `${key}=${action.payload[key]}`;
          }
        })
        .join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/key-personnel?${query}`);
    yield put({
      type: KeyPersonnelActions.FETCH_KEY_PERSONNEL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KeyPersonnelActions.FETCH_KEY_PERSONNEL_ERROR,
      payload: error,
    });
  }
}

export function* fetchOneKeyPersonnel(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/key-personnel/${action.payload}`
    );
    yield put({
      type: KeyPersonnelActions.FETCH_ONE_KEY_PERSONNEL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KeyPersonnelActions.FETCH_ONE_KEY_PERSONNEL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchKeyPersonnel() {
  yield takeLatest(KeyPersonnelActions.FETCH_KEY_PERSONNEL, fetchKeyPersonnel);
}

export function* watcherFetchOneKeyPersonnel() {
  yield takeLatest(
    KeyPersonnelActions.FETCH_ONE_KEY_PERSONNEL,
    fetchOneKeyPersonnel
  );
}
