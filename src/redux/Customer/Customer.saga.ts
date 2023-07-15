import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { CustomerActionTypes } from "./Customer.type";

export function* fetchAllCustomers(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/customer`);
    yield put({
      type: CustomerActionTypes.FETCH_ALL_CUSTOMER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CustomerActionTypes.FETCH_ALL_CUSTOMER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllCustomers() {
  yield takeLatest(CustomerActionTypes.FETCH_ALL_CUSTOMER, fetchAllCustomers);
}
