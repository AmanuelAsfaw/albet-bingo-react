import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { VariationActionTypes } from "./Variation.type";

export function* fetchAllVariations(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/variation`);
    yield put({
      type: VariationActionTypes.FETCH_ALL_VARIATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: VariationActionTypes.FETCH_ALL_VARIATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneVariation(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/variation/${action.payload}`
    );
    yield put({
      type: VariationActionTypes.FETCH_ONE_VARIATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: VariationActionTypes.FETCH_ONE_VARIATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllVariations() {
  yield takeLatest(VariationActionTypes.FETCH_ALL_VARIATION, fetchAllVariations);
}

export function* watcherFetchOneVariation() {
  yield takeLatest(VariationActionTypes.FETCH_ONE_VARIATION, fetchOneVariation);
}
