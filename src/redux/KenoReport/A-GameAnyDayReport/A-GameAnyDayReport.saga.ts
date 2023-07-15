import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { KenoAnyDayByGameReportSummaryActionTypes } from "./A-GameAnyDayReport.type";

export function* fetchAllKenoReports(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_day_a_game_bill_report/${action.payload.game}`,{
      date :action.payload.date
    });
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoReport(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_day_a_game_bill_report/${action.payload.game}`,{
      date :action.payload.date
    });
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS,
        payload: response.data.report,
      });
    else
      yield put({
        type: KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoReports() {
  yield takeLatest(KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY, fetchAllKenoReports);
}

export function* watcherFetchOneKenoReport() {
  yield takeLatest(KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY, fetchOneKenoReport);
}
