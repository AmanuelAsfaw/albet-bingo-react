import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { PaymentFileActionTypes } from "./PaymentFile.type";

export function* fetchAllPaymentFiles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/payment-file?project_id=${action.payload.project_id}`
    );
    yield put({
      type: PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePaymentFiles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/payment-file/${action.payload}`
    );
    yield put({
      type: PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllPaymentFiles() {
  yield takeLatest(
    PaymentFileActionTypes.FETCH_ALL_PAYMENT_FILE,
    fetchAllPaymentFiles
  );
}

export function* watcherFetchOnePaymentFiles() {
  yield takeLatest(
    PaymentFileActionTypes.FETCH_ONE_PAYMENT_FILE,
    fetchOnePaymentFiles
  );
}
