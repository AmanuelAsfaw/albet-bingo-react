import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { PaymentsActionTypes } from "./Payments.type";

export function* fetchAllPaymentss(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/payments?project_id=${action.payload.project_id}`);
    yield put({
      type: PaymentsActionTypes.FETCH_ALL_PAYMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PaymentsActionTypes.FETCH_ALL_PAYMENTS_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePaymentss(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/payments/${action.payload}`
    );
    yield put({
      type: PaymentsActionTypes.FETCH_ONE_PAYMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PaymentsActionTypes.FETCH_ONE_PAYMENTS_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllPaymentss() {
  yield takeLatest(PaymentsActionTypes.FETCH_ALL_PAYMENTS, fetchAllPaymentss);
}

export function* watcherFetchOnePaymentss() {
  yield takeLatest(PaymentsActionTypes.FETCH_ONE_PAYMENTS, fetchOnePaymentss);
}
