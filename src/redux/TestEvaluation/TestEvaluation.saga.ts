import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TestEvaluationActionTypes } from "./TestEvaluation.type";

export function* fetchAllTestEvaluations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/test-evaluation?project_id=${action.payload.project_id}`
    );
    yield put({
      type: TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTestEvaluations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/test-evaluation/${action.payload}`
    );
    yield put({
      type: TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTestEvaluations() {
  yield takeLatest(
    TestEvaluationActionTypes.FETCH_ALL_TEST_EVALUATION,
    fetchAllTestEvaluations
  );
}

export function* watcherFetchOneTestEvaluations() {
  yield takeLatest(
    TestEvaluationActionTypes.FETCH_ONE_TEST_EVALUATION,
    fetchOneTestEvaluations
  );
}
