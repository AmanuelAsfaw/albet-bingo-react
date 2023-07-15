import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { FinancialActionTypes } from "./Financial.type";

export function* fetchAllFinancials(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/financial?${query}`);
    yield put({
      type: FinancialActionTypes.FETCH_ALL_FINANCIAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FinancialActionTypes.FETCH_ALL_FINANCIAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedFinancials(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/financial?${query}`);
    yield put({
      type: FinancialActionTypes.FETCH_PAGED_FINANCIAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FinancialActionTypes.FETCH_PAGED_FINANCIAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneFinancials(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/financial/${action.payload}`
    );
    yield put({
      type: FinancialActionTypes.FETCH_ONE_FINANCIAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FinancialActionTypes.FETCH_ONE_FINANCIAL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllFinancials() {
  yield takeLatest(
    FinancialActionTypes.FETCH_ALL_FINANCIAL,
    fetchAllFinancials
  );
}

export function* watcherFetchPagedFinancials() {
  yield takeLatest(
    FinancialActionTypes.FETCH_PAGED_FINANCIAL,
    fetchPagedFinancials
  );
}

export function* watcherFetchOneFinancials() {
  yield takeLatest(
    FinancialActionTypes.FETCH_ONE_FINANCIAL,
    fetchOneFinancials
  );
}
