import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ProjectDurationActionTypes } from "./ProjectDuration.type";

export function* fetchAllProjectDurations(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/project_duration?${query}`
    );
    yield put({
      type: ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedProjectDurations(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/project_duration?${query}`
    );
    yield put({
      type: ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneProjectDurations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project_duration/${action.payload}`
    );
    yield put({
      type: ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllProjectDurations() {
  yield takeLatest(
    ProjectDurationActionTypes.FETCH_ALL_PROJECT_DURATION,
    fetchAllProjectDurations
  );
}

export function* watcherFetchPagedProjectDurations() {
  yield takeLatest(
    ProjectDurationActionTypes.FETCH_PAGED_PROJECT_DURATION,
    fetchPagedProjectDurations
  );
}

export function* watcherFetchOneProjectDurations() {
  yield takeLatest(
    ProjectDurationActionTypes.FETCH_ONE_PROJECT_DURATION,
    fetchOneProjectDurations
  );
}
