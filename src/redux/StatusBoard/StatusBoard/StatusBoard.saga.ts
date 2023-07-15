import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../../ApiCall";
import { formatQuery } from "../../Utils";
import { StatusBoardActionTypes } from "./StatusBoard.type";

export function* fetchAllStatusBoard(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/status-board?${query}`);

    yield put({
      type: StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneStatusBoard(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/status-board/${action.payload}`);
    yield put({
      type: StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD_FAILURE,
      payload: error,
    });
  }
}


export function* watcherFetchAllStatusBoard() {
  yield takeLatest(StatusBoardActionTypes.FETCH_ALL_STATUS_BOARD, fetchAllStatusBoard);
}

export function* watcherFetchOneStatusBoard() {
  yield takeLatest(StatusBoardActionTypes.FETCH_ONE_STATUS_BOARD, fetchOneStatusBoard);
}
