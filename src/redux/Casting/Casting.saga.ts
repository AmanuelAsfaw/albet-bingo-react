import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { CastingActionTypes } from "./Casting.type";

export function* fetchAllCastings(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/casting`);
    yield put({
      type: CastingActionTypes.FETCH_ALL_CASTING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CastingActionTypes.FETCH_ALL_CASTING_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllCastings() {
  yield takeLatest(CastingActionTypes.FETCH_ALL_CASTING, fetchAllCastings);
}
