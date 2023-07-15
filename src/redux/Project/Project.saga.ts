import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ProjectActionTypes } from "./Project.type";

export function* fetchAllProjects(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }

    const response = yield axios.get(`${API_BASE_URI}/project?${query}`);
    yield put({
      type: ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectActionTypes.FETCH_ALL_PROJECT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllListProjects(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/project/list`);
    yield put({
      type: ProjectActionTypes.FETCH_ALL_PROJECT_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectActionTypes.FETCH_ALL_PROJECT_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneProjects(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project/${action.payload}`
    );
    yield put({
      type: ProjectActionTypes.FETCH_ONE_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectActionTypes.FETCH_ONE_PROJECT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllPreProjects(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/project/pre_contract`);
    yield put({
      type: ProjectActionTypes.FETCH_ALL_PRE_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectActionTypes.FETCH_ALL_PRE_PROJECT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePreProjects(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project/${action.payload}`
    );
    yield put({
      type: ProjectActionTypes.FETCH_ONE_PRE_PROJECT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectActionTypes.FETCH_ONE_PRE_PROJECT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllProjects() {
  yield takeLatest(ProjectActionTypes.FETCH_ALL_PROJECT, fetchAllProjects);
}

export function* watcherFetchAllListProjects() {
  yield takeLatest(
    ProjectActionTypes.FETCH_ALL_PROJECT_LIST,
    fetchAllListProjects
  );
}

export function* watcherFetchOneProjects() {
  yield takeLatest(ProjectActionTypes.FETCH_ONE_PROJECT, fetchOneProjects);
}

export function* watcherFetchAllPreProjects() {
  yield takeLatest(
    ProjectActionTypes.FETCH_ALL_PRE_PROJECT,
    fetchAllPreProjects
  );
}

export function* watcherFetchOnePreProjects() {
  yield takeLatest(
    ProjectActionTypes.FETCH_ONE_PRE_PROJECT,
    fetchOnePreProjects
  );
}
