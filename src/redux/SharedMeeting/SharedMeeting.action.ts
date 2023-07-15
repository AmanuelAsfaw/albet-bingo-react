import { SharedMeetingActionTypes } from "./SharedMeeting.type";

/**
 * Fetch All SharedMeetings
 *
 * @param payload
 */
export const fetchAllSharedMeetings = (payload?: any) => ({
  type: SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING,
  payload: payload,
});

/**
 * Reset Fetch SharedMeetings State
 *
 * @param payload
 */
export const fetchAllSharedMeetingsReset = (payload?: any) => ({
  type: SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING_RESET,
  payload: payload,
});
