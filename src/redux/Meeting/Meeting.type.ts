import { Project } from "../Project/Project.type";
import { SharedMeeting } from "../SharedMeeting/SharedMeeting.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Meeting = {
  id: any;
  date: string;
  type: string;
  location: string;
  project: Project;
  project_id: number;
  meeting_attendances: MeetingAttendance[];
  meeting_agendas: MeetingAgenda[];
  meeting_agenda_discussions: MeetingAgendaDiscussion[];
  meeting_participants: MeetingParticipant[];
  meeting_shared_users: SharedMeeting[];
  meeting_completion_time: string;
  meeting_no: number;
};

export type MeetingStateTypes = {
  fetchAll: ApiCallState<Meeting[]>;
  fetchOne: ApiCallState<Meeting | {}>;
};

export const MeetingActionTypes = {
  FETCH_ALL_MEETING: "FETCH_ALL_MEETING",
  FETCH_ALL_MEETING_RESET: "FETCH_ALL_MEETING_RESET",
  FETCH_ALL_MEETING_FAILURE: "FETCH_ALL_MEETING_FAILURE",
  FETCH_ALL_MEETING_SUCCESS: "FETCH_ALL_MEETING_SUCCESS",

  FETCH_ONE_MEETING: "FETCH_ONE_MEETING",
  FETCH_ONE_MEETING_RESET: "FETCH_ONE_MEETING_RESET",
  FETCH_ONE_MEETING_FAILURE: "FETCH_ONE_MEETING_FAILURE",
  FETCH_ONE_MEETING_SUCCESS: "FETCH_ONE_MEETING_SUCCESS",
};

type MeetingAttendance = {
  id: number;
  full_name: string;
  role: string;
  meeting_attendance: {
    is_approved: boolean;
    id: number;
    user_id: number;
  };
};

type MeetingSharedInfo = {
  meeting_shared: {
    is_approved: boolean;
    id: number;
    user_id: number;
  };
  id: number;
  full_name: string;
  role: string;
  meeting_attendance: {
    is_approved: boolean;
    id: number;
    user_id: number;
  };
};

export type MeetingParticipant = {
  id: number;
  name: string;
  position: string;
};

type MeetingAgenda = {
  id: any;
  description: string;
};

type MeetingAgendaDiscussion = {
  id: any;
  description: string;
};
