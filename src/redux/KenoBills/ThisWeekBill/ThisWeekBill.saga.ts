import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";

// import { API_BASE_URI } from "../../ApiCall";
import { ThisWeekKenoBillActionTypes } from "./ThisWeekBill.type";

export function* fetchAllKenoBills(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/casher/get_this_week_bills`);
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_SUCCESS,
        payload: response.data.data,
      });
    else
      yield put({
        type: ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_FAILURE,
        payload: "Data Response is not Correct",
      });

  } catch (error) {
    yield put({
      type: ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoBills(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}this-week-keno-bill/${action.payload}`
    );
    yield put({
      type: ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL, fetchOneKenoBills);
}
