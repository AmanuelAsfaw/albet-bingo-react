import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { MainUrl as API_BASE_URI } from "./../../../constants/Url";

// import { API_BASE_URI } from "../../ApiCall";
import { TodayKenoBillActionTypes } from "./Today.type";

export function* fetchAllKenoBills(action: any): any {
  console.log('fetchAllTodayKenoBills in today saga')
  try {
    const response = yield axios.get(`${API_BASE_URI}/casher/get_today_bills`);
    console.log(response.data);
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_SUCCESS,
        payload: response.data.data,
      });
    else
      yield put({
        type: TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoBills(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}today-keno-bill/${action.payload}`
    );
    yield put({
      type: TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL, fetchOneKenoBills);
}
