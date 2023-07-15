import { ApiCallState } from "../Utils";

export type ShareMeetingFile= {
  id: number;
  project_id:number;
  meeting_file_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};

export type ShareMeetingFileStateTypes = {
  fetchAll: ApiCallState<ShareMeetingFile[]>;
  fetchOne: ApiCallState<ShareMeetingFile | {}>;
};

export const ShareMeetingFileActionTypes = {
  FETCH_ALL_SHARE_MEETING_FILE: "FETCH_ALL_SHARE_MEETING_FILE",
  FETCH_ALL_SHARE_MEETING_FILE_RESET: "FETCH_ALL_SHARE_MEETING_FILE_RESET",
  FETCH_ALL_SHARE_MEETING_FILE_FAILURE: "FETCH_ALL_SHARE_MEETING_FILE_FAILURE",
  FETCH_ALL_SHARE_MEETING_FILE_SUCCESS: "FETCH_ALL_SHARE_MEETING_FILE_SUCCESS",

  FETCH_ONE_SHARE_MEETING_FILE: "FETCH_ONE_SHARE_MEETING_FILE",
  FETCH_ONE_SHARE_MEETING_FILE_RESET: "FETCH_ONE_SHARE_MEETING_FILE_RESET",
  FETCH_ONE_SHARE_MEETING_FILE_FAILURE: "FETCH_ONE_SHARE_MEETING_FILE_FAILURE",
  FETCH_ONE_SHARE_MEETING_FILE_SUCCESS: "FETCH_ONE_SHARE_MEETING_FILE_SUCCESS",
};
