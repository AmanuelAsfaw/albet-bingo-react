import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { WeekReportActionTypes } from "./WeekReport.type";

export function* fetchAllWeekReport(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/weekly-report?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: WeekReportActionTypes.FETCH_ALL_WEEK_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeekReportActionTypes.FETCH_ALL_WEEK_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllWeekReport() {
  yield takeLatest(
    WeekReportActionTypes.FETCH_ALL_WEEK_REPORT,
    fetchAllWeekReport
  );
}
