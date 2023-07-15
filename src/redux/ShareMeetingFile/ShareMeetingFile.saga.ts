import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ShareMeetingFileActionTypes } from "./ShareMeetingFile.type";

export function* fetchAllShareMeetingFiles(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/share-meeting-file?meeting_file_id=${action.payload?.meeting_file_id}`);
    yield put({
      type: ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneShareMeetingFiles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/share-meeting-file/${action.payload}`
    );
    yield put({
      type: ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllShareMeetingFiles() {
  yield takeLatest(ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE, fetchAllShareMeetingFiles);
}

export function* watcherFetchOneShareMeetingFiles() {
  yield takeLatest(ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE, fetchOneShareMeetingFiles);
}
