import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";

// import { API_BASE_URI } from "../../ApiCall";
import { AnyDayByGameKenoBillActionTypes } from "./AnyDayByGame.type";

export function* fetchAllKenoBills(action: any): any {
  try {
    const response = yield axios.post(`${API_BASE_URI}/casher/get_any_day_by_game_bills/${action.payload.game}`,{
      date: action.payload.date
    });
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_SUCCESS,
        payload: response.data.data,
      });
    else
      yield put({
        type: AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoBills(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}anyday-bygame-keno-bill/${action.payload}`
    );
    yield put({
      type: AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME, fetchOneKenoBills);
}
