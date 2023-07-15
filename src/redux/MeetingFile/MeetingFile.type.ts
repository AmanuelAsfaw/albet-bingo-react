import { Document } from "../Document/Document.type";
import { ApiCallState } from "../Utils";

export type MeetingFile= {
  id: number;
  user_id: number;
  project_id:number;
  no:number;
  date:string;
  meeting_type:string;
  document:Document;
};

export type MeetingFileStateTypes = {
  fetchAll: ApiCallState<MeetingFile[]>;
  fetchOne: ApiCallState<MeetingFile | {}>;
};

export const MeetingFileActionTypes = {
  FETCH_ALL_MEETING_FILE: "FETCH_ALL_MEETING_FILE",
  FETCH_ALL_MEETING_FILE_RESET: "FETCH_ALL_MEETING_FILE_RESET",
  FETCH_ALL_MEETING_FILE_FAILURE: "FETCH_ALL_MEETING_FILE_FAILURE",
  FETCH_ALL_MEETING_FILE_SUCCESS: "FETCH_ALL_MEETING_FILE_SUCCESS",

  FETCH_ONE_MEETING_FILE: "FETCH_ONE_MEETING_FILE",
  FETCH_ONE_MEETING_FILE_RESET: "FETCH_ONE_MEETING_FILE_RESET",
  FETCH_ONE_MEETING_FILE_FAILURE: "FETCH_ONE_MEETING_FILE_FAILURE",
  FETCH_ONE_MEETING_FILE_SUCCESS: "FETCH_ONE_MEETING_FILE_SUCCESS",
};
