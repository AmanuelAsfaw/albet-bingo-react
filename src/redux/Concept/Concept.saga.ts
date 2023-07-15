import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ConceptActionTypes } from "./Concept.type";

export function* fetchAllConcepts(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/concept?${query}`);

    yield put({
      type: ConceptActionTypes.FETCH_ALL_CONCEPT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ConceptActionTypes.FETCH_ALL_CONCEPT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedConcepts(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/concept?${query}`);
    yield put({
      type: ConceptActionTypes.FETCH_PAGED_CONCEPT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ConceptActionTypes.FETCH_PAGED_CONCEPT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneConcepts(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/concept/${action.payload}`
    );
    yield put({
      type: ConceptActionTypes.FETCH_ONE_CONCEPT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ConceptActionTypes.FETCH_ONE_CONCEPT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllConcepts() {
  yield takeLatest(ConceptActionTypes.FETCH_ALL_CONCEPT, fetchAllConcepts);
}

export function* watcherFetchPagedConcepts() {
  yield takeLatest(ConceptActionTypes.FETCH_PAGED_CONCEPT, fetchPagedConcepts);
}

export function* watcherFetchOneConcepts() {
  yield takeLatest(ConceptActionTypes.FETCH_ONE_CONCEPT, fetchOneConcepts);
}
