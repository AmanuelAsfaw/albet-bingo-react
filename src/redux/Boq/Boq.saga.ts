import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { BoqActionTypes } from "./Boq.type";

export function* fetchAllBoqs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/boq?project_id=${action.payload.project_id}&is_variation=${action.payload.is_variation}`
    );
    yield put({
      type: BoqActionTypes.FETCH_ALL_BOQ_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BoqActionTypes.FETCH_ALL_BOQ_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneBoq(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/boq/${action.payload}`);
    yield put({
      type: BoqActionTypes.FETCH_ONE_BOQ_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BoqActionTypes.FETCH_ONE_BOQ_FAILURE,
      payload: error,
    });
  }
}

export function* fetchDetailBoq(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/boq/detail?project_id=${action.payload}`
    );
    yield put({
      type: BoqActionTypes.FETCH_DETAIL_BOQ_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BoqActionTypes.FETCH_DETAIL_BOQ_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllBoq() {
  yield takeLatest(BoqActionTypes.FETCH_ALL_BOQ, fetchAllBoqs);
}

export function* watcherFetchOneBoq() {
  yield takeLatest(BoqActionTypes.FETCH_ONE_BOQ, fetchOneBoq);
}

export function* watcherFetchDetailBoq() {
  yield takeLatest(BoqActionTypes.FETCH_DETAIL_BOQ, fetchDetailBoq);
}
