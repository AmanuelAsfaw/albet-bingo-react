import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TaskCategoryActionTypes } from "./TaskCategory.type";
import { formatQuery } from "../Utils";

export function* fetchAllTaskCategory(action: any): any {
  try {
    const query = formatQuery(action);

    const response = yield axios.get(`${API_BASE_URI}/task-category?${query}`);
    yield put({
      type: TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllFormTaskCategory(action: any): any {
  try {
    const query = formatQuery(action);

    const response = yield axios.get(`${API_BASE_URI}/task-category?${query}`);
    yield put({
      type: TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllDetailedTaskCategory(action: any): any {
  try {
    const query = formatQuery(action);

    const response = yield axios.get(
      `${API_BASE_URI}/task-category/detailed?${query}`
    );
    yield put({
      type: TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTaskCategories(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/task-category/${action.payload}`
    );
    yield put({
      type: TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTaskCategorys() {
  yield takeLatest(
    TaskCategoryActionTypes.FETCH_ALL_TASK_CATEGORY,
    fetchAllTaskCategory
  );
}

export function* watcherFetchAllFormTaskCategorys() {
  yield takeLatest(
    TaskCategoryActionTypes.FETCH_ALL_FORM_TASK_CATEGORY,
    fetchAllFormTaskCategory
  );
}

export function* watcherFetchAllDetailedTaskCategorys() {
  yield takeLatest(
    TaskCategoryActionTypes.FETCH_ALL_DETAILED_TASK_CATEGORY,
    fetchAllDetailedTaskCategory
  );
}

export function* watcherFetchOneTaskCategorys() {
  yield takeLatest(
    TaskCategoryActionTypes.FETCH_ONE_TASK_CATEGORY,
    fetchOneTaskCategories
  );
}
