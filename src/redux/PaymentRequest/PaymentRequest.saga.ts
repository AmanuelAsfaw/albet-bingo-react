import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { PaymentRequestActionTypes } from "./PaymentRequest.type";

export function* fetchAllPaymentRequests(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/payment-request?project_id=${action.payload.project_id}`);
    yield put({
      type: PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePaymentRequests(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/payment-request/${action.payload}`
    );
    yield put({
      type: PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllPaymentRequests() {
  yield takeLatest(PaymentRequestActionTypes.FETCH_ALL_PAYMENT_REQUEST, fetchAllPaymentRequests);
}

export function* watcherFetchOnePaymentRequests() {
  yield takeLatest(PaymentRequestActionTypes.FETCH_ONE_PAYMENT_REQUEST, fetchOnePaymentRequests);
}
