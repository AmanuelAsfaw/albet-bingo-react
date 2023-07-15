import axios from "axios";
import { isNil } from "lodash";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SharedMeetingActionTypes } from "./SharedMeeting.type";

export function* fetchAllSharedMeetings(action: any): any {
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
      type: SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSharedMeetings() {
  yield takeLatest(
    SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING,
    fetchAllSharedMeetings
  );
}
