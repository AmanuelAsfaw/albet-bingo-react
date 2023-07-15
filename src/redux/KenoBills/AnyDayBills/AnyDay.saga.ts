import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";

// import { API_BASE_URI } from "../../ApiCall";
import { AnyDayKenoBillActionTypes } from "./AnyDay.type";

export function* fetchAllKenoBills(action: any): any {
  console.log('fetchAllKenoBills in AnyDay saga');
  
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_day_bills`, {
      date: action.payload.date
    });
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_SUCCESS,
        payload: response.data.data,
      });
    else
      yield put({
        type: AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoBills(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}anyday-keno-bill/${action.payload}`
    );
    yield put({
      type: AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL, fetchOneKenoBills);
}
