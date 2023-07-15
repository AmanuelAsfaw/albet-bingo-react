import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SiteBookActionTypes } from "./SiteBook.type";

export function* fetchAllSiteBooks(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/site-book?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: SiteBookActionTypes.FETCH_ALL_SITE_BOOK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SiteBookActionTypes.FETCH_ALL_SITE_BOOK_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneSiteBooks(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/site-book/${action.payload}`
    );
    yield put({
      type: SiteBookActionTypes.FETCH_ONE_SITE_BOOK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SiteBookActionTypes.FETCH_ONE_SITE_BOOK_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSiteBooks() {
  yield takeLatest(SiteBookActionTypes.FETCH_ALL_SITE_BOOK, fetchAllSiteBooks);
}

export function* watcherFetchOneSiteBooks() {
  yield takeLatest(SiteBookActionTypes.FETCH_ONE_SITE_BOOK, fetchOneSiteBooks);
}
