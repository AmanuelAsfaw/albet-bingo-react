import { MeetingFileActionTypes } from "./MeetingFile.type";

/**
 * Fetch All MeetingFile
 *
 * @param payload
 */
export const fetchAllMeetingFile = (payload?: any) => ({
  type: MeetingFileActionTypes.FETCH_ALL_MEETING_FILE,
  payload: payload,
});

/**
 * Fetch All MeetingFile
 *
 * @param payload
 */
export const fetchOneMeetingFile = (payload?: any) => ({
  type: MeetingFileActionTypes.FETCH_ONE_MEETING_FILE,
  payload: payload,
});

/**
 * Reset Fetch MeetingFile State
 *
 * @param payload
 */
export const fetchAllMeetingFileReset = (payload?: any) => ({
  type: MeetingFileActionTypes.FETCH_ALL_MEETING_FILE_RESET,
  payload: payload,
});
