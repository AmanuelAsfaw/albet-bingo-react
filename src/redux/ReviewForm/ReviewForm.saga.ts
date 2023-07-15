import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ReviewFormActionTypes } from "./ReviewForm.type";
import { authHeader } from "../../utilities/utilities";

export function* fetchAllReviewForm(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/review-form`,
      authHeader()
    );
    yield put({
      type: ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllReviewForm() {
  yield takeLatest(
    ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM,
    fetchAllReviewForm
  );
}
