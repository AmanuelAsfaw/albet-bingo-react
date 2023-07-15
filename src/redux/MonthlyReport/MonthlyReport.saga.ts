import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MonthlyReportActionTypes } from "./MonthlyReport.type";

export function* fetchAllMonthlyReports(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/monthly-report?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMonthlyReports(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/monthly-report/${action.payload}`
    );
    yield put({
      type: MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMonthlyReports() {
  yield takeLatest(
    MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT,
    fetchAllMonthlyReports
  );
}

export function* watcherFetchOneMonthlyReports() {
  yield takeLatest(
    MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT,
    fetchOneMonthlyReports
  );
}
