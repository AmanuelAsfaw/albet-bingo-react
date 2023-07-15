import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { TenderDocumentActionTypes } from "./TenderDocument.type";

export function* fetchAllTenderDocuments(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/tender-document`);
    yield put({
      type: TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneTenderDocument(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/tender-document/${action.payload}`
    );
    yield put({
      type: TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllTenderDocuments() {
  yield takeLatest(TenderDocumentActionTypes.FETCH_ALL_TENDER_DOCUMENT, fetchAllTenderDocuments);
}

export function* watcherFetchOneTenderDocument() {
  yield takeLatest(TenderDocumentActionTypes.FETCH_ONE_TENDER_DOCUMENT, fetchOneTenderDocument);
}
