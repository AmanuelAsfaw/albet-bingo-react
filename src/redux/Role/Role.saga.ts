import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { RoleActionTypes } from "./Role.type";

export function* fetchAllRoles(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/role?${query}`);
    yield put({
      type: RoleActionTypes.FETCH_ALL_ROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RoleActionTypes.FETCH_ALL_ROLE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneRoles(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/role/${action.payload}`);
    yield put({
      type: RoleActionTypes.FETCH_ONE_ROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RoleActionTypes.FETCH_ONE_ROLE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllRoles() {
  yield takeLatest(RoleActionTypes.FETCH_ALL_ROLE, fetchAllRoles);
}

export function* watcherFetchOneRoles() {
  yield takeLatest(RoleActionTypes.FETCH_ONE_ROLE, fetchOneRoles);
}
