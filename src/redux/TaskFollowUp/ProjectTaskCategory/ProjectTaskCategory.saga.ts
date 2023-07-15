import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../../ApiCall";
import { ProjectTaskCategoryActionTypes } from "./ProjectTaskCategory.type";

export function* fetchAllProjectTaskCategory(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/project-task-category?${query}`);
    yield put({
      type: ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedProjectTaskCategory(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/project-task-category?${query}`);
    yield put({
      type: ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneProjectTaskCategory(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project-task-category/${action.payload}`
    );
    yield put({
      type: ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllProjectTaskCategory() {
  yield takeLatest(ProjectTaskCategoryActionTypes.FETCH_ALL_PROJECT_TASK_CATEGORY, fetchAllProjectTaskCategory);
}

export function* watcherFetchPagedProjectTaskCategory() {
  yield takeLatest(
    ProjectTaskCategoryActionTypes.FETCH_PAGED_PROJECT_TASK_CATEGORY,
    fetchPagedProjectTaskCategory
  );
}

export function* watcherFetchOneProjectTaskCategory() {
  yield takeLatest(ProjectTaskCategoryActionTypes.FETCH_ONE_PROJECT_TASK_CATEGORY, fetchOneProjectTaskCategory);
}
