import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ScheduleActionTypes } from "./Schedule.type";

export function* fetchAllSchedules(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/schedule/gantt_data/${action.payload}`
    );
    yield put({
      type: ScheduleActionTypes.FETCH_ALL_SCHEDULE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ScheduleActionTypes.FETCH_ALL_SCHEDULE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSchedules() {
  yield takeLatest(ScheduleActionTypes.FETCH_ALL_SCHEDULE, fetchAllSchedules);
}
