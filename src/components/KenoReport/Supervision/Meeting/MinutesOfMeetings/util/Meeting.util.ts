import { getUserData } from "../../../../../../utilities/utilities";
import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Meeting } from "../../../../../../redux/Meeting/Meeting.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { MeetingType } from "../../../../../../constants/Constants";
import moment from "moment";

export type MeetingPropType = {
  fetchMeetings: Function;
  fetchMeeting: Function;
  fetchUsers: Function;
  meetings: ApiCallState<Meeting[]>;
  project: ApiCallState<Project>;
};

export type AddMeetingPropType = {
  fetchMeeting: Function;
  project: ApiCallState<Project>;
  meetings: ApiCallState<Meeting[]>;
};

export type EditMeetingPropType = {
  fetchMeetings: Function;
  fetchMeeting: Function;
  id: number;
  project: ApiCallState<Project>;
  meetings: ApiCallState<Meeting[]>;
  meeting: ApiCallState<Meeting>;
  index: number;
};

export type AttendancePropType = {
  users: ApiCallState<User[]>;
  setData: Function;
  data: any;
};

export type ParticipantPropType = {
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export type ActionPlanPropType = {
  setData: Function;
  data: any;
  participant: any[];
  users: ApiCallState<User[]>;
};

export type MeetingTablesType = {
  setData: Function;
  data: any;
};

export type DetailPropType = {
  meeting: ApiCallState<Meeting>;
  project: ApiCallState<Project>;
  fetchMeeting: Function;
  meeting_id: number;
  index: number;
};

export type PrintPropType = {
  meeting: ApiCallState<Meeting>;
  project: ApiCallState<Project>;
  is_visible: boolean;
  setVisibility: Function;
  index: number;
};

export type StatusPropType = {
  meeting: Meeting;
  project: ApiCallState<Project>;
  fetchMeetings: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/meeting", data);

export const editData = (data: any) =>
  axios.put(API_BASE_URI + "/meeting", data);

export const approve = (id: number) =>
  axios.put(API_BASE_URI + "/meeting/approve", { id });

export const shareApprove = (id: number) =>
  axios.put(API_BASE_URI + "/meeting/share-approve", { id });

export const shareApproveRevise = (id: number) =>
  axios.put(API_BASE_URI + "/meeting/share-approve-revise", { id });

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/meeting/${id}`);

export const onChangeHandler1 = (
  key: number,
  value: any,
  data: any[],
  setData: Function
) => {
  const newData = [...data];

  const index = newData.findIndex((e) => e.key === key);
  if (index !== -1) {
    let item = newData[index];
    item = {
      ...item,
      description: value,
    };
    newData.splice(index, 1, item);
    setData(newData);
  }
};

export const isParticipating = (meeting: Meeting) => {
  let data: {
    participating: boolean;
    is_approved: boolean;
    is_done: boolean;
    id: number | null;
    all_pending: boolean;
  } = {
    participating: false,
    is_approved: false,
    is_done: true,
    id: null,
    all_pending: true,
  };
  const { id } = getUserData();

  meeting.meeting_attendances.forEach((e) => {
    if (e.id === id) {
      data = {
        ...data,
        participating: true,
        is_approved: e.meeting_attendance.is_approved,
        id: e.meeting_attendance.id,
      };
    }
    if (!e.meeting_attendance.is_approved) data = { ...data, is_done: false };
    else {
      data = { ...data, all_pending: false };
    }
  });

  return data;
};

export const isSharedUser = (meeting: Meeting) => {
  let data: {
    is_shared_user: boolean;
    is_approved: boolean;
    is_done: boolean;
    id: number | null;
    approved_by: number | null;
    all_pending: boolean;
  } = {
    is_shared_user: false,
    is_approved: false,
    approved_by: null,
    is_done: false,
    id: null,
    all_pending: true,
  };
  const { id } = getUserData();

  meeting.meeting_shared_users.forEach((e) => {
    if (e.user_id === id) {
      data = {
        ...data,
        is_shared_user: true,
        is_approved: e.is_approved,
        approved_by: id,
        id: e.id,
      };
    }
    if (e.is_approved) data = { ...data, is_done: true };
    else {
      data = { ...data, all_pending: false };
    }
  });

  return data;
};

export const saveData = (data: any) => {
  localStorage.setItem("meeting", JSON.stringify(data));
};

export const getData = () => {
  let saved_data = localStorage.getItem("meeting");
  if (saved_data) {
    let parsed = JSON.parse(saved_data);
    return {
      ...parsed,
      date: moment(parsed.date),
      // next_date: moment(parsed.next_date),
      meeting_completion_time: moment(parsed.next_time),
      // action_plans: parsed.action_plans.map((e: any) => ({
      //   ...e,
      //   schedule_by: moment(e.schedule_by),
      // })),
    };
  } else
    return {
      type: MeetingType.REGULAR_WEEKLY,
      date: moment(),
      attendances: [{ key: Date.now() }],
      agendas: [{ key: Date.now() }],
      // opening_remarks: [{ key: Date.now() }],
      // previous_corrections: [{ key: Date.now() }],
      // incoming_documents: [{ key: Date.now() }],
      agenda_discussions: [{ key: Date.now() }],
      // general_work_progress: [{ key: Date.now() }],
      // additional_issues: [{ key: Date.now() }],
      // documents: [{ key: Date.now() }],
      // action_plans: [{ key: Date.now() }],
      participant: [{ key: Date.now() }],
    };
};

export const clearData = () => {
  localStorage.removeItem("meeting");
};
