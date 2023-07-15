import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";

// import { API_BASE_URI } from "../../ApiCall";
import { AnyWeekKenoBillActionTypes } from "./AnyWeekBill.type";

export function* fetchAllKenoBills(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_week_bills`, {
      weekly_date: action.payload.date
    });
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_SUCCESS,
        payload: response.data.data,
      });
    else
      yield put({
        type: AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_FAILURE,
        payload: "Data Response is not Correct",
      });

  } catch (error) {
    yield put({
      type: AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoBills(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}any-week-keno-bill/${action.payload}`
    );
    yield put({
      type: AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL, fetchOneKenoBills);
}
