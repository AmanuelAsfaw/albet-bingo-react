import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TestRequestActionTypes } from "./TestRequest.type";

export function* fetchAllTestRequest(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/test_request?project_id=${action.payload}`);
    yield put({
      type: TestRequestActionTypes.FETCH_ALL_TEST_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TestRequestActionTypes.FETCH_ALL_TEST_REQUEST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTestRequest(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/test_request/${action.payload}`);
    yield put({
      type: TestRequestActionTypes.FETCH_ONE_TEST_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TestRequestActionTypes.FETCH_ONE_TEST_REQUEST_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTestRequest() {
  yield takeLatest(TestRequestActionTypes.FETCH_ALL_TEST_REQUEST, fetchAllTestRequest);
}

export function* watcherFetchOneTestRequest() {
  yield takeLatest(TestRequestActionTypes.FETCH_ONE_TEST_REQUEST, fetchOneTestRequest);
}
