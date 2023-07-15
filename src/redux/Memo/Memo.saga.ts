import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MemoActionTypes } from "./Memo.type";

export function* fetchAllMemos(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/memo?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: MemoActionTypes.FETCH_ALL_MEMO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MemoActionTypes.FETCH_ALL_MEMO_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMemos(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/memo/${action.payload}`);
    yield put({
      type: MemoActionTypes.FETCH_ONE_MEMO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MemoActionTypes.FETCH_ONE_MEMO_FAILURE,
      payload: error,
    });
  }
}

export function* fetchCountMemos(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/memo/count`);
    yield put({
      type: MemoActionTypes.FETCH_COUNT_MEMO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MemoActionTypes.FETCH_COUNT_MEMO_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMemos() {
  yield takeLatest(MemoActionTypes.FETCH_ALL_MEMO, fetchAllMemos);
}

export function* watcherFetchOneMemos() {
  yield takeLatest(MemoActionTypes.FETCH_ONE_MEMO, fetchOneMemos);
}

export function* watcherFetchCountMemos() {
  yield takeLatest(MemoActionTypes.FETCH_COUNT_MEMO, fetchCountMemos);
}
