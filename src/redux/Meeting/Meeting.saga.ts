import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MeetingActionTypes } from "./Meeting.type";

export function* fetchAllMeetings(action: any): any {
	try {
		const response = yield axios.get(
			`${API_BASE_URI}/meeting?project_id=${action.payload?.project_id}`
		);
		yield put({
			type: MeetingActionTypes.FETCH_ALL_MEETING_SUCCESS,
			payload: response.data,
		});
	} catch (error) {
		yield put({
			type: MeetingActionTypes.FETCH_ALL_MEETING_FAILURE,
			payload: error,
		});
	}
}

export function* fetchOneMeetings(action: any): any {
	try {
		const response = yield axios.get(
			`${API_BASE_URI}/meeting/${action.payload}`
		);
		yield put({
			type: MeetingActionTypes.FETCH_ONE_MEETING_SUCCESS,
			payload: response.data,
		});
	} catch (error) {
		yield put({
			type: MeetingActionTypes.FETCH_ONE_MEETING_FAILURE,
			payload: error,
		});
	}
}

export function* watcherFetchAllMeetings() {
	yield takeLatest(MeetingActionTypes.FETCH_ALL_MEETING, fetchAllMeetings);
}

export function* watcherFetchOneMeetings() {
	yield takeLatest(MeetingActionTypes.FETCH_ONE_MEETING, fetchOneMeetings);
}
