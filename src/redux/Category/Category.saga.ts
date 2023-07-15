import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { CategoryActionTypes } from "./Category.type";

export function* fetchAllCategory(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/category?${query}`);
    yield put({
      type: CategoryActionTypes.FETCH_ALL_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CategoryActionTypes.FETCH_ALL_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedCategory(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/category?${query}`);
    yield put({
      type: CategoryActionTypes.FETCH_PAGED_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CategoryActionTypes.FETCH_PAGED_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneCategory(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/category/${action.payload}`
    );
    yield put({
      type: CategoryActionTypes.FETCH_ONE_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CategoryActionTypes.FETCH_ONE_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllCategory() {
  yield takeLatest(CategoryActionTypes.FETCH_ALL_CATEGORY, fetchAllCategory);
}

export function* watcherFetchPagedCategory() {
  yield takeLatest(
    CategoryActionTypes.FETCH_PAGED_CATEGORY,
    fetchPagedCategory
  );
}

export function* watcherFetchOneCategory() {
  yield takeLatest(CategoryActionTypes.FETCH_ONE_CATEGORY, fetchOneCategory);
}
