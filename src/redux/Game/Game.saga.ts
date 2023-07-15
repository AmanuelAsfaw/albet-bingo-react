import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { GameActionTypes } from "./Game.type";

export function* fetchAllGames(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }

    const response = yield axios.get(`${API_BASE_URI}/project?${query}`);
    yield put({
      type: GameActionTypes.FETCH_ALL_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GameActionTypes.FETCH_ALL_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllListGames(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/project/list`);
    yield put({
      type: GameActionTypes.FETCH_ALL_GAME_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GameActionTypes.FETCH_ALL_GAME_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneGames(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project/${action.payload}`
    );
    yield put({
      type: GameActionTypes.FETCH_ONE_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GameActionTypes.FETCH_ONE_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllPreGames(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/project/pre_contract`);
    yield put({
      type: GameActionTypes.FETCH_ALL_PRE_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GameActionTypes.FETCH_ALL_PRE_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePreGames(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project/${action.payload}`
    );
    yield put({
      type: GameActionTypes.FETCH_ONE_PRE_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: GameActionTypes.FETCH_ONE_PRE_GAME_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllGames() {
  yield takeLatest(GameActionTypes.FETCH_ALL_GAME, fetchAllGames);
}

export function* watcherFetchAllListGames() {
  yield takeLatest(
    GameActionTypes.FETCH_ALL_GAME_LIST,
    fetchAllListGames
  );
}

export function* watcherFetchOneGames() {
  yield takeLatest(GameActionTypes.FETCH_ONE_GAME, fetchOneGames);
}

export function* watcherFetchAllPreGames() {
  yield takeLatest(
    GameActionTypes.FETCH_ALL_PRE_GAME,
    fetchAllPreGames
  );
}

export function* watcherFetchOnePreGames() {
  yield takeLatest(
    GameActionTypes.FETCH_ONE_PRE_GAME,
    fetchOnePreGames
  );
}
