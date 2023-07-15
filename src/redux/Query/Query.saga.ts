import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { QueryActionTypes } from "./Query.type";

export function* fetchAllQueries(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/query?project_id=${action.payload?.project_id}`);
    yield put({
      type: QueryActionTypes.FETCH_ALL_QUERY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: QueryActionTypes.FETCH_ALL_QUERY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneQueries(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/query/${action.payload}`
    );
    yield put({
      type: QueryActionTypes.FETCH_ONE_QUERY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: QueryActionTypes.FETCH_ONE_QUERY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllQueries() {
  yield takeLatest(QueryActionTypes.FETCH_ALL_QUERY, fetchAllQueries);
}

export function* watcherFetchOneQueries() {
  yield takeLatest(QueryActionTypes.FETCH_ONE_QUERY, fetchOneQueries);
}
