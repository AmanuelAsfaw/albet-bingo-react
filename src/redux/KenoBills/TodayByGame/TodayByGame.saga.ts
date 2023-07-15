import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { MainUrl as API_BASE_URI } from "../../../constants/Url";

// import { API_BASE_URI } from "../../ApiCall";
import { TodayByGameKenoBillActionTypes } from "./TodayByGame.type";

export function* fetchAllKenoBills(action: any): any {
  console.log('fetchAllKenoBills in today by game saga'); 
  
  try {
    const response = yield axios.get(`${API_BASE_URI}/casher/get_today_by_game_bills/${action.payload.game_number}`);
    console.log(response.data);
    console.log(response.data.data);
    
    if(response.data && response.data?.data && response.data?.status == 200)
      yield put({
        type: TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_SUCCESS,
        payload: response.data.data,
      });
    else
      yield put({
        type: TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_FAILURE,
        payload: "Data Response is not Correct",
      });
  } catch (error) {
    yield put({
      type: TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_FAILURE,
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
      type: TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoBills() {
  yield takeLatest(TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME, fetchAllKenoBills);
}

export function* watcherFetchOneKenoBill() {
  yield takeLatest(TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME, fetchOneKenoBills);
}
