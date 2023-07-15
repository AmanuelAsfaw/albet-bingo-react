import { API_BASE_URI } from "./../ApiCall";
import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { RiskLogActionTypes } from "./RiskLog.type";

export function* fetchAllRiskLogs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/risk-log?project_id=${action.payload.project_id}`
    );
    yield put({
      type: RiskLogActionTypes.FETCH_ALL_RISK_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RiskLogActionTypes.FETCH_ALL_RISK_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneRiskLogs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/risk-log/${action.payload}`
    );
    yield put({
      type: RiskLogActionTypes.FETCH_ONE_RISK_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RiskLogActionTypes.FETCH_ONE_RISK_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllRiskLogs() {
  yield takeLatest(RiskLogActionTypes.FETCH_ALL_RISK_LOG, fetchAllRiskLogs);
}

export function* watcherFetchOneRiskLogs() {
  yield takeLatest(RiskLogActionTypes.FETCH_ONE_RISK_LOG, fetchOneRiskLogs);
}
