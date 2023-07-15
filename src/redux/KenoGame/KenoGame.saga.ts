import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { KenoGameActionTypes } from "./KenoGame.type";

export function* fetchAllKenoGames(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/keno-game?project_id=${action.payload.project_id}`);
    yield put({
      type: KenoGameActionTypes.FETCH_ALL_KENO_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoGameActionTypes.FETCH_ALL_KENO_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKenoGame(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/keno-game/${action.payload}`
    );
    yield put({
      type: KenoGameActionTypes.FETCH_ONE_KENO_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KenoGameActionTypes.FETCH_ONE_KENO_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKenoGames() {
  yield takeLatest(KenoGameActionTypes.FETCH_ALL_KENO_GAME, fetchAllKenoGames);
}

export function* watcherFetchOneKenoGame() {
  yield takeLatest(KenoGameActionTypes.FETCH_ONE_KENO_GAME, fetchOneKenoGame);
}
