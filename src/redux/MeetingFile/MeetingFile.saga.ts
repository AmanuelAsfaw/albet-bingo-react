import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MeetingFileActionTypes } from "./MeetingFile.type";

export function* fetchAllMeetingFiles(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/meeting-file?project_id=${action.payload.project_id}`);
    yield put({
      type: MeetingFileActionTypes.FETCH_ALL_MEETING_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MeetingFileActionTypes.FETCH_ALL_MEETING_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMeetingFiles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/meeting-file/${action.payload}`
    );
    yield put({
      type: MeetingFileActionTypes.FETCH_ONE_MEETING_FILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MeetingFileActionTypes.FETCH_ONE_MEETING_FILE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMeetingFiles() {
  yield takeLatest(MeetingFileActionTypes.FETCH_ALL_MEETING_FILE, fetchAllMeetingFiles);
}

export function* watcherFetchOneMeetingFiles() {
  yield takeLatest(MeetingFileActionTypes.FETCH_ONE_MEETING_FILE, fetchOneMeetingFiles);
}
