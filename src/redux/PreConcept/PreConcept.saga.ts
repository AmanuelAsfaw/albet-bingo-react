import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { PreConceptActionTypes } from "./PreConcept.type";

export function* fetchAllPreConcepts(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/concept?${query}`);
    yield put({
      type: PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedPreConcepts(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `key=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/concept?${query}`);
    yield put({
      type: PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOnePreConcepts(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/concept/${action.payload}`
    );
    yield put({
      type: PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllPreConcepts() {
  yield takeLatest(
    PreConceptActionTypes.FETCH_ALL_PRE_CONCEPT,
    fetchAllPreConcepts
  );
}

export function* watcherFetchPagedPreConcepts() {
  yield takeLatest(
    PreConceptActionTypes.FETCH_PAGED_PRE_CONCEPT,
    fetchPagedPreConcepts
  );
}

export function* watcherFetchOnePreConcepts() {
  yield takeLatest(
    PreConceptActionTypes.FETCH_ONE_PRE_CONCEPT,
    fetchOnePreConcepts
  );
}
