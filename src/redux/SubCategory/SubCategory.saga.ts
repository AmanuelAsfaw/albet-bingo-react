import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SubCategoryActionTypes } from "./SubCategory.type";

export function* fetchAllSubCategory(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/sub_category?${query}`);
    yield put({
      type: SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedSubCategory(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/sub_category?${query}`);
    yield put({
      type: SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneSubCategory(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/sub_category/${action.payload}`
    );
    yield put({
      type: SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSubCategory() {
  yield takeLatest(
    SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY,
    fetchAllSubCategory
  );
}

export function* watcherFetchPagedSubCategory() {
  yield takeLatest(
    SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY,
    fetchPagedSubCategory
  );
}

export function* watcherFetchOneSubCategory() {
  yield takeLatest(
    SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY,
    fetchOneSubCategory
  );
}
