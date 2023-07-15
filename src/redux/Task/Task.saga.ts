import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TaskActionTypes } from "./Task.type";
import { formatQuery } from "../Utils";

export function* fetchAllTasks(action: any): any {
  try {
    const query = formatQuery(action);

    const response = yield axios.get(`${API_BASE_URI}/task?${query}`);
    yield put({
      type: TaskActionTypes.FETCH_ALL_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskActionTypes.FETCH_ALL_TASK_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllFormTasks(action: any): any {
  try {
    const query = formatQuery(action);

    const response = yield axios.get(`${API_BASE_URI}/task?${query}`);
    yield put({
      type: TaskActionTypes.FETCH_ALL_FORM_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskActionTypes.FETCH_ALL_FORM_TASK_FAILURE,
      payload: error,
    });
  }
}

export function* fetchTaskReport(action: any): any {
  try {
    const query = formatQuery(action);

    const response = yield axios.get(`${API_BASE_URI}/task/report?${query}`);
    yield put({
      type: TaskActionTypes.FETCH_TASK_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskActionTypes.FETCH_TASK_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTasks(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/task/${action.payload}`);
    yield put({
      type: TaskActionTypes.FETCH_ONE_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskActionTypes.FETCH_ONE_TASK_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTasks() {
  yield takeLatest(TaskActionTypes.FETCH_ALL_TASK, fetchAllTasks);
}

export function* watcherFetchAllFormTasks() {
  yield takeLatest(TaskActionTypes.FETCH_ALL_FORM_TASK, fetchAllFormTasks);
}

export function* watcherFetchTaskReport() {
  yield takeLatest(TaskActionTypes.FETCH_TASK_REPORT, fetchTaskReport);
}

export function* watcherFetchOneTasks() {
  yield takeLatest(TaskActionTypes.FETCH_ONE_TASK, fetchOneTasks);
}
