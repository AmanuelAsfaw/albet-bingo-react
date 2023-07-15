import { Meeting } from "../Meeting/Meeting.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type SharedMeeting = {
  id: number;
  user_id: number;
  meeting_id: number;
  shared_by_id: number;

  user: User;
  shared_by: User;
  status: string;
  is_approved : boolean;
};

export type SharedMeetingStateTypes = {
  fetchAll: ApiCallState<SharedMeeting[]>;
};

export const SharedMeetingActionTypes = {
  FETCH_ALL_SHARED_MEETING: "FETCH_ALL_SHARED_MEETING",
  FETCH_ALL_SHARED_MEETING_RESET: "FETCH_ALL_SHARED_MEETING_RESET",
  FETCH_ALL_SHARED_MEETING_FAILURE: "FETCH_ALL_SHARED_MEETING_FAILURE",
  FETCH_ALL_SHARED_MEETING_SUCCESS: "FETCH_ALL_SHARED_MEETING_SUCCESS",
};
