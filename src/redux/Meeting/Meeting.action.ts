import { MeetingActionTypes } from "./Meeting.type";

/**
 * Fetch All Meeting
 *
 * @param payload
 */
export const fetchAllMeeting = (payload?: any) => ({
	type: MeetingActionTypes.FETCH_ALL_MEETING,
	payload: payload,
});

/**
 * Fetch All Meeting
 *
 * @param payload
 */
export const fetchOneMeeting = (payload?: any) => ({
	type: MeetingActionTypes.FETCH_ONE_MEETING,
	payload: payload,
});

/**
 * Reset Fetch Meeting State
 *
 * @param payload
 */
export const fetchAllMeetingReset = (payload?: any) => ({
	type: MeetingActionTypes.FETCH_ALL_MEETING_RESET,
	payload: payload,
});
