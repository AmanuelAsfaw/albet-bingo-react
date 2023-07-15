import { MeetingStateTypes, MeetingActionTypes } from "./Meeting.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MeetingStateTypes = {
	fetchAll: resetApiCallState([]),
	fetchOne: resetApiCallState({}),
};

const MeetingReducer = (
	state: MeetingStateTypes = INITIAL_STATE,
	action: any
): MeetingStateTypes => {
	switch (action.type) {
		case MeetingActionTypes.FETCH_ALL_MEETING:
			return {
				...state,
				fetchAll: {
					error: null,
					payload: [],
					isPending: true,
					isSuccessful: false,
				},
			};
		case MeetingActionTypes.FETCH_ALL_MEETING_RESET:
			return {
				...state,
				fetchAll: resetApiCallState([]),
			};
		case MeetingActionTypes.FETCH_ALL_MEETING_FAILURE:
			return {
				...state,
				fetchAll: {
					payload: [],
					isPending: false,
					isSuccessful: false,
					error: action.payload,
				},
			};
		case MeetingActionTypes.FETCH_ALL_MEETING_SUCCESS:
			return {
				...state,
				fetchAll: {
					error: null,
					isPending: false,
					isSuccessful: true,
					payload: action.payload,
				},
			};

		case MeetingActionTypes.FETCH_ONE_MEETING:
			return {
				...state,
				fetchOne: {
					error: null,
					payload: {},
					isPending: true,
					isSuccessful: false,
				},
			};
		case MeetingActionTypes.FETCH_ONE_MEETING_RESET:
			return {
				...state,
				fetchAll: resetApiCallState([]),
			};
		case MeetingActionTypes.FETCH_ONE_MEETING_FAILURE:
			return {
				...state,
				fetchOne: {
					payload: {},
					isPending: false,
					isSuccessful: false,
					error: action.payload,
				},
			};
		case MeetingActionTypes.FETCH_ONE_MEETING_SUCCESS:
			return {
				...state,
				fetchOne: {
					error: null,
					isPending: false,
					isSuccessful: true,
					payload: action.payload,
				},
			};

		default:
			return state;
	}
};

export default MeetingReducer;
