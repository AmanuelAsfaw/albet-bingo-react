import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { PriceEscalationFileActionTypes } from "./PriceEscalationFile.type";

export function* fetchAllPriceEscalationFiles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/price-escalation-file?project_id=${action.payload.project_id}`
    );
    yield put({
      type: PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePriceEscalationFiles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/price-escalation-file/${action.payload}`
    );
    yield put({
      type: PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllPriceEscalationFiles() {
  yield takeLatest(
    PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE,
    fetchAllPriceEscalationFiles
  );
}

export function* watcherFetchOnePriceEscalationFiles() {
  yield takeLatest(
    PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE,
    fetchOnePriceEscalationFiles
  );
}
