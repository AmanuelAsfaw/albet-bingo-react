import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { LetterActionTypes } from "./Letter.type";

export function* fetchAllLetters(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/letter`);
    yield put({
      type: LetterActionTypes.FETCH_ALL_LETTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LetterActionTypes.FETCH_ALL_LETTER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneLetters(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/letter/${action.payload}`
    );
    yield put({
      type: LetterActionTypes.FETCH_ONE_LETTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LetterActionTypes.FETCH_ONE_LETTER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllLetters() {
  yield takeLatest(LetterActionTypes.FETCH_ALL_LETTER, fetchAllLetters);
}

export function* watcherFetchOneLetters() {
  yield takeLatest(LetterActionTypes.FETCH_ONE_LETTER, fetchOneLetters);
}
