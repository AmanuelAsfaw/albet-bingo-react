import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TestResultActionTypes } from "./TestResult.type";

export function* fetchAllTestResult(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/test_result?project_id=${action.payload}`);
    yield put({
      type: TestResultActionTypes.FETCH_ALL_TEST_RESULT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TestResultActionTypes.FETCH_ALL_TEST_RESULT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTestResult(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/test_result/${action.payload}`);
    yield put({
      type: TestResultActionTypes.FETCH_ONE_TEST_RESULT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TestResultActionTypes.FETCH_ONE_TEST_RESULT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTestResult() {
  yield takeLatest(TestResultActionTypes.FETCH_ALL_TEST_RESULT, fetchAllTestResult);
}

export function* watcherFetchOneTestResult() {
  yield takeLatest(TestResultActionTypes.FETCH_ONE_TEST_RESULT, fetchOneTestResult);
}
