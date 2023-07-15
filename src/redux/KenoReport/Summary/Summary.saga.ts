import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../../ApiCall";
import { KenoReportSummaryActionTypes } from "./Summary.type";

export function* fetchAllKenoGames(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/keno-game?project_id=${action.payload.project_id}`);
    yield put({
      type: KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoGame(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/keno-game/${action.payload}`
    );
    yield put({
      type: KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoGames() {
  yield takeLatest(KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY, fetchAllKenoGames);
}

export function* watcherFetchOneKenoGame() {
  yield takeLatest(KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY, fetchOneKenoGame);
}
