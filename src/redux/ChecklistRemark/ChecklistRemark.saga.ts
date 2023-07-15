import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ChecklistRemarkActionTypes } from "./ChecklistRemark.type";

export function* fetchAllChecklistRemarks(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/check-list-remark?check_list_id=${action.payload.check_list_id}`);
    yield put({
      type: ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneChecklistRemarks(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/check-list-remark/${action.payload}`
    );
    yield put({
      type: ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllChecklistRemarks() {
  yield takeLatest(ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK, fetchAllChecklistRemarks);
}

export function* watcherFetchOneChecklistRemarks() {
  yield takeLatest(ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK, fetchOneChecklistRemarks);
}
