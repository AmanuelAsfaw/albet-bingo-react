import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MaterialActions } from "./Material.type";

export function* fetchMaterials(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/material`);
    yield put({
      type: MaterialActions.FETCH_MATERIAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialActions.FETCH_MATERIAL_ERROR,
      payload: error,
    });
  }
}

export function* watcherFetchMaterials() {
  yield takeLatest(MaterialActions.FETCH_MATERIAL, fetchMaterials);
}
