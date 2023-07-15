import { ShareMeetingFileActionTypes } from "./ShareMeetingFile.type";

/**
 * Fetch All ShareMeetingFile
 *
 * @param payload
 */
export const fetchAllShareMeetingFile = (payload?: any) => ({
  type: ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE,
  payload: payload,
});

/**
 * Fetch All ShareMeetingFile
 *
 * @param payload
 */
export const fetchOneShareMeetingFile = (payload?: any) => ({
  type: ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE,
  payload: payload,
});

/**
 * Reset Fetch ShareMeetingFile State
 *
 * @param payload
 */
export const fetchAllShareMeetingFileReset = (payload?: any) => ({
  type: ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE_RESET,
  payload: payload,
});
