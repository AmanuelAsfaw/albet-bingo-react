import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

// import { API_BASE_URI } from "../../ApiCall";
import { MainUrl as API_BASE_URI } from "../../constants/Url";
import { CartelaActionTypes } from "./TodayBill.type";

export function* fetchAllCartelas(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/bingo/get_cartelas`);
    yield put({
      type: CartelaActionTypes.FETCH_ALL_CARTELA_SUCCESS,
      payload: response?.data?.cartelas,
    });
  } catch (error) {
    yield put({
      type: CartelaActionTypes.FETCH_ALL_CARTELA_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneCartela(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/keno-bill/${action.payload}`
    );
    yield put({
      type: CartelaActionTypes.FETCH_ONE_CARTELA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CartelaActionTypes.FETCH_ONE_CARTELA_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllCartelas() {
  yield takeLatest(CartelaActionTypes.FETCH_ALL_CARTELA, fetchAllCartelas);
}

export function* watcherFetchOneCartela() {
  yield takeLatest(CartelaActionTypes.FETCH_ONE_CARTELA, fetchOneCartela);
}
