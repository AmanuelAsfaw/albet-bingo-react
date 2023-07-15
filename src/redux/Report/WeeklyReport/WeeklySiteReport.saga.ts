import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../../ApiCall";
import { WeeklyReportsActionTypes } from "./WeeklyReport.type";

export function* fetchAllWeeklySiteReports(action: any): any {
  try {
    console.log('weekly-site-report saga');
    
    const response = yield axios.get(`${API_BASE_URI}/weekly-site-report?project_id=${action.payload?.project_id}`);
    yield put({
      type: WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneWeeklySiteReports(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/weekly-site-report/${action.payload}`
    );
    yield put({
      type: WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllWeeklySiteReports() {
  yield takeLatest(WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS, fetchAllWeeklySiteReports);
}

export function* watcherFetchOneWeeklySiteReports() {
  yield takeLatest(WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS, fetchOneWeeklySiteReports);
}
