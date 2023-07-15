import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { WorkPermitActionTypes } from "./WorkPermit.type";

export function* fetchAllWorkPermits(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/work-permit?project_id=${action.payload.project_id}`);
    yield put({
      type: WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneWorkPermits(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/work-permit/${action.payload}`
    );
    yield put({
      type: WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllWorkPermits() {
  yield takeLatest(WorkPermitActionTypes.FETCH_ALL_WORK_PERMIT, fetchAllWorkPermits);
}

export function* watcherFetchOneWorkPermits() {
  yield takeLatest(WorkPermitActionTypes.FETCH_ONE_WORK_PERMIT, fetchOneWorkPermits);
}
