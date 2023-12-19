import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { KenoInstantReportSummaryActionTypes } from "./InstantReport.type";

export function* fetchAllKenoReports(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/casher/get_any_day_instant_report`);
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoReport(action: any): any {
  console.log('fetchOneKenoReport action');
  console.log(action.payload);
  
  try {
    const response = yield axios.post(
      `${API_BASE_URI}/casher/get_any_day_instant_report`,
      {
        "date": action.payload.date,
      }
    );
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoReports() {
  yield takeLatest(KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY, fetchAllKenoReports);
}

export function* watcherFetchOneKenoReport() {
  yield takeLatest(KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_INSTANT_REPORT_SUMMARY, fetchOneKenoReport);
}
