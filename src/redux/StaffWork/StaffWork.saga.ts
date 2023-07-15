import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { StaffWorkActionTypes } from "./StaffWork.type";

export function* fetchAllStaffWorks(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/staff-work?project_id=${action.payload.project_id}`
    );
    yield put({
      type: StaffWorkActionTypes.FETCH_ALL_STAFF_WORK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: StaffWorkActionTypes.FETCH_ALL_STAFF_WORK_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneStaffWorks(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/staff-work/${action.payload}`
    );
    yield put({
      type: StaffWorkActionTypes.FETCH_ONE_STAFF_WORK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: StaffWorkActionTypes.FETCH_ONE_STAFF_WORK_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllStaffWorks() {
  yield takeLatest(
    StaffWorkActionTypes.FETCH_ALL_STAFF_WORK,
    fetchAllStaffWorks
  );
}

export function* watcherFetchOneStaffWorks() {
  yield takeLatest(
    StaffWorkActionTypes.FETCH_ONE_STAFF_WORK,
    fetchOneStaffWorks
  );
}
