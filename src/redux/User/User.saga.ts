import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../ApiCall";
import { formatQuery } from "../Utils";
import { UserActionTypes } from "./User.type";

export function* fetchAllUser(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user?${query}`);

    yield put({
      type: UserActionTypes.FETCH_ALL_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_ALL_USER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneUser(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/user/${action.payload}`);
    yield put({
      type: UserActionTypes.FETCH_ONE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_ONE_USER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchLoggedInUser(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/user/logged-in`);
    yield put({
      type: UserActionTypes.FETCH_LOGGED_IN_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_LOGGED_IN_USER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchFeatureUser(action: any): any {
  console.log("this is from saga");
  console.log(action);
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user/feature?${formatQuery(action)}`
    );
    yield put({
      type: UserActionTypes.FETCH_FEATURE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_FEATURE_USER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllUser() {
  yield takeLatest(UserActionTypes.FETCH_ALL_USER, fetchAllUser);
}

export function* watcherFetchOneUser() {
  yield takeLatest(UserActionTypes.FETCH_ONE_USER, fetchOneUser);
}

export function* watcherFetchLoggedInUser() {
  yield takeLatest(UserActionTypes.FETCH_LOGGED_IN_USER, fetchLoggedInUser);
}

export function* watcherFetchFeatureUser() {
  yield takeLatest(UserActionTypes.FETCH_FEATURE_USER, fetchFeatureUser);
}
