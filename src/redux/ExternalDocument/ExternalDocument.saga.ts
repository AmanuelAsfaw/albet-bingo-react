import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ExternalDocumentActionTypes } from "./ExternalDocument.type";

export function* fetchAllExternalDocuments(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/external-document?project_id=${action.payload.project_id}`);
    yield put({
      type: ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneExternalDocuments(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/external-document/${action.payload}`
    );
    yield put({
      type: ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllExternalDocuments() {
  yield takeLatest(ExternalDocumentActionTypes.FETCH_ALL_EXTERNAL_DOCUMENT, fetchAllExternalDocuments);
}

export function* watcherFetchOneExternalDocuments() {
  yield takeLatest(ExternalDocumentActionTypes.FETCH_ONE_EXTERNAL_DOCUMENT, fetchOneExternalDocuments);
}
