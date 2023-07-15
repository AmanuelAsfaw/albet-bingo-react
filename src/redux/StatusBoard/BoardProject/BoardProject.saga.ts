import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../../ApiCall";
import { formatQuery } from "../../Utils";
import { BoardProjectActionTypes } from "./BoardProject.type";

export function* fetchAllBoardProject(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/board-project?${query}`);

    yield put({
      type: BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneBoardProject(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/board-project/${action.payload}`);
    yield put({
      type: BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllBoardProject() {
  yield takeLatest(BoardProjectActionTypes.FETCH_ALL_BOARD_PROJECT, fetchAllBoardProject);
}

export function* watcherFetchOneBoardProject() {
  yield takeLatest(BoardProjectActionTypes.FETCH_ONE_BOARD_PROJECT, fetchOneBoardProject);
}
