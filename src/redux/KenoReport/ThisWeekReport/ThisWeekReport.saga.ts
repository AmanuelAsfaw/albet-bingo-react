import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { KenoThisWeekReportSummaryActionTypes } from "./ThisWeekReport.type";

export function* fetchAllKenoReports(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/casher/get_this_week_bill_report`);
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoReport(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/casher/get_this_week_bill_report`
    );
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoReports() {
  yield takeLatest(KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY, fetchAllKenoReports);
}

export function* watcherFetchOneKenoReport() {
  yield takeLatest(KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY, fetchOneKenoReport);
}
