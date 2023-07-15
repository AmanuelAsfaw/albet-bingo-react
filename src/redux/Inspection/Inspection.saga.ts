import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { InspectionActionTypes } from "./Inspection.type";

export function* fetchAllInspection(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/inspection?project_id=${action.payload.project_id}`);
    yield put({
      type: InspectionActionTypes.FETCH_ALL_INSPECTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: InspectionActionTypes.FETCH_ALL_INSPECTION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneInspection(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/inspection/${action.payload.id}`);
    yield put({
      type: InspectionActionTypes.FETCH_ONE_INSPECTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: InspectionActionTypes.FETCH_ONE_INSPECTION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllInspection() {
  yield takeLatest(InspectionActionTypes.FETCH_ALL_INSPECTION, fetchAllInspection);
}

export function* watcherFetchOneInspection() {
  yield takeLatest(InspectionActionTypes.FETCH_ONE_INSPECTION, fetchOneInspection);
}
