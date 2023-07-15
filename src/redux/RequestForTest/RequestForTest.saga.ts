import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { RequestForTestActionTypes } from "./RequestForTest.type";

export function* fetchAllRequestForTests(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/request-for-test?project_id=${action.payload.project_id}`);
    yield put({
      type: RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneRequestForTests(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/request-for-test/${action.payload}`
    );
    yield put({
      type: RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllRequestForTests() {
  yield takeLatest(RequestForTestActionTypes.FETCH_ALL_REQUEST_FOR_TEST, fetchAllRequestForTests);
}

export function* watcherFetchOneRequestForTests() {
  yield takeLatest(RequestForTestActionTypes.FETCH_ONE_REQUEST_FOR_TEST, fetchOneRequestForTests);
}
