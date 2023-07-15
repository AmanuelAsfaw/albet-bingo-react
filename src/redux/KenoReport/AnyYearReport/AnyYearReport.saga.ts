import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { KenoAnyYearReportSummaryActionTypes } from "./AnyYearReport.type";

export function* fetchAllKenoReports(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_year_bill_report`,{
      date :action.payload.date
    });
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoReport(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_year_bill_report`,{
      date :action.payload.date
    });
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoReports() {
  yield takeLatest(KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY, fetchAllKenoReports);
}

export function* watcherFetchOneKenoReport() {
  yield takeLatest(KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY, fetchOneKenoReport);
}
