import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";
import { KenoTodayBillActionTypes } from "./TodayBill.type";

export function* fetchAllKenoBills(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}keno-bill?project_id=${action.payload.project_id}`);
    yield put({
      type: KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoBills(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/keno-bill/${action.payload}`
    );
    yield put({
      type: KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL, fetchOneKenoBills);
}
