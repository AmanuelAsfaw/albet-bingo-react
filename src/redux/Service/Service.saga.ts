import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ServiceActionTypes } from "./Service.type";

export function* fetchAllServices(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/service`);
    yield put({
      type: ServiceActionTypes.FETCH_ALL_SERVICE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ServiceActionTypes.FETCH_ALL_SERVICE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllServices() {
  yield takeLatest(ServiceActionTypes.FETCH_ALL_SERVICE, fetchAllServices);
}
