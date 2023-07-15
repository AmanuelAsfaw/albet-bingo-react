import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ClientActionTypes } from "./Client.type";

export function* fetchAllClients(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/client`);
    yield put({
      type: ClientActionTypes.FETCH_ALL_CLIENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ClientActionTypes.FETCH_ALL_CLIENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllClients() {
  yield takeLatest(ClientActionTypes.FETCH_ALL_CLIENT, fetchAllClients);
}
