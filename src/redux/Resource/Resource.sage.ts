import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ResourceActionTypes } from "./Resource.type";

export function* fetchAllResources(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/resource`);
    yield put({
      type: ResourceActionTypes.FETCH_ALL_RESOURCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ResourceActionTypes.FETCH_ALL_RESOURCE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneResources(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/resource/${action.payload}`
    );
    yield put({
      type: ResourceActionTypes.FETCH_ONE_RESOURCE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ResourceActionTypes.FETCH_ONE_RESOURCE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllResources() {
  yield takeLatest(ResourceActionTypes.FETCH_ALL_RESOURCE, fetchAllResources);
}

export function* watcherFetchOneResources() {
  yield takeLatest(ResourceActionTypes.FETCH_ONE_RESOURCE, fetchOneResources);
}
