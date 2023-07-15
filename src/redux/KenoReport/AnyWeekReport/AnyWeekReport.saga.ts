import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { KenoAnyWeekReportSummaryActionTypes } from "./AnyWeekReport.type";

export function* fetchAllKenoReports(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_week_bill_report`,{
      date :action.payload.date
    });
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoReport(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_week_bill_report`,{
      date :action.payload.date
    });
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoReports() {
  yield takeLatest(KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY, fetchAllKenoReports);
}

export function* watcherFetchOneKenoReport() {
  yield takeLatest(KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY, fetchOneKenoReport);
}
