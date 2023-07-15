import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { KenoCasherActionTypes } from "./KenoCasher.type";

export function* fetchAllKenoCashers(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/keno-game?project_id=${action.payload.project_id}`);
    yield put({
      type: KenoCasherActionTypes.FETCH_ALL_KENO_CASHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoCasherActionTypes.FETCH_ALL_KENO_CASHER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoCasher(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/keno-game/${action.payload}`
    );
    yield put({
      type: KenoCasherActionTypes.FETCH_ONE_KENO_CASHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoCasherActionTypes.FETCH_ONE_KENO_CASHER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoCashers() {
  yield takeLatest(KenoCasherActionTypes.FETCH_ALL_KENO_CASHER, fetchAllKenoCashers);
}

export function* watcherFetchOneKenoCasher() {
  yield takeLatest(KenoCasherActionTypes.FETCH_ONE_KENO_CASHER, fetchOneKenoCasher);
}
