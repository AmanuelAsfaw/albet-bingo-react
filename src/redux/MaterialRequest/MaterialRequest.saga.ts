import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MaterialRequestActionTypes } from "./MaterialRequest.type";

export function* fetchAllMaterialRequests(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/material-request?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMaterialRequests(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/material-request/${action.payload}`
    );
    yield put({
      type: MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMaterialRequests() {
  yield takeLatest(
    MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST,
    fetchAllMaterialRequests
  );
}

export function* watcherFetchOneMaterialRequests() {
  yield takeLatest(
    MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST,
    fetchOneMaterialRequests
  );
}
