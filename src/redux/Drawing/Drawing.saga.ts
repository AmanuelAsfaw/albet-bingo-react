import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { DrawingActionTypes } from "./Drawing.type";

export function* fetchAllDrawings(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/drawing`);
    yield put({
      type: DrawingActionTypes.FETCH_ALL_DRAWING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DrawingActionTypes.FETCH_ALL_DRAWING_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneDrawing(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/drawing/${action.payload}`
    );
    yield put({
      type: DrawingActionTypes.FETCH_ONE_DRAWING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DrawingActionTypes.FETCH_ONE_DRAWING_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllDrawings() {
  yield takeLatest(DrawingActionTypes.FETCH_ALL_DRAWING, fetchAllDrawings);
}

export function* watcherFetchOneDrawing() {
  yield takeLatest(DrawingActionTypes.FETCH_ONE_DRAWING, fetchOneDrawing);
}
