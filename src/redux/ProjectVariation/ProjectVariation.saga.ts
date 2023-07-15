import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ProjectVariationActionTypes } from "./ProjectVariation.type";

export function* fetchAllProjectVariations(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/project_variation?${query}`
    );
    yield put({
      type: ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedProjectVariations(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/project_variation?${query}`
    );
    yield put({
      type: ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneProjectVariations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/project_variation/${action.payload}`
    );
    yield put({
      type: ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllProjectVariations() {
  yield takeLatest(
    ProjectVariationActionTypes.FETCH_ALL_PROJECT_VARIATION,
    fetchAllProjectVariations
  );
}

export function* watcherFetchPagedProjectVariations() {
  yield takeLatest(
    ProjectVariationActionTypes.FETCH_PAGED_PROJECT_VARIATION,
    fetchPagedProjectVariations
  );
}

export function* watcherFetchOneProjectVariations() {
  yield takeLatest(
    ProjectVariationActionTypes.FETCH_ONE_PROJECT_VARIATION,
    fetchOneProjectVariations
  );
}
