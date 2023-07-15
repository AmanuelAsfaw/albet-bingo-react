import axios from "axios";
import { isNil } from "lodash";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SharedDocumentActionTypes } from "./SharedDocument.type";

export function* fetchAllSharedDocuments(action: any): any {
  try {
    let query = "";

    query += !isNil(action.payload.user_id)
      ? `user_id=${action.payload.user_id}`
      : "";

    query += !isNil(action.payload.document_id)
      ? query.length !== 0
        ? `&&document_id=${action.payload.document_id}`
        : `document_id=${action.payload.document_id}`
      : "";

    const response = yield axios.get(
      `${API_BASE_URI}/shared_document?${query}`
    );
    yield put({
      type: SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSharedDocuments() {
  yield takeLatest(
    SharedDocumentActionTypes.FETCH_ALL_SHARED_DOCUMENT,
    fetchAllSharedDocuments
  );
}
