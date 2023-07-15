import axios from "axios";
import moment from "moment";
import { NEW_LETTER_TYPE } from "../../../../../../../../constants/Constants";
import { API_BASE_URI } from "../../../../../../../../redux/ApiCall";
import { Meeting } from "../../../../../../../../redux/Meeting/Meeting.type";
import { Project } from "../../../../../../../../redux/Project/Project.type";
import { User } from "../../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../../redux/Utils";

export type MeetingPropType = {
  meetings: ApiCallState<Meeting[]>;
  fetchMeeting: Function;
  tab: any;
};

export type AddMeetingPropType = {
  fetchMeeting: Function;
  projects: ApiCallState<Project[]>
};

export type ShareMeetingPropType = {
  fetchMeeting: Function;
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
  meeting: Meeting;
};

export type RemarkPropType = {
  remarkData: Meeting;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
  fetchMeeting: Function;
};

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/meeting-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/meeting/seen", data);

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/meeting", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const sendShareMeetingData = (data: any) =>
  axios.post(API_BASE_URI + "/meeting/share-meeting", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/meeting/${id}`);

export const deleteShareMeetingData = (id: any) =>
  axios.delete(API_BASE_URI + `/meeting/share-meeting/${id}`);

/*export const parseData = (remark: Meeting, user_id: number) => {
  let counter = 0;
  let user = remark.users.find((e: any) => e.id === user_id);
  if (user) {
    let last_seen = user?.["user_meeting"].last_seen;
    remark.meeting_remarks.forEach((e) => {
      if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
        counter += 1;
    });
  } else {
    remark.meeting_remarks.forEach((e) => {
      counter += 1;
    });
  }
  return { counter };
};*/

export const parsePayloadData = (arr: Meeting[]) => {
  let parse = arr.filter((e) => e.type === NEW_LETTER_TYPE.INCOMING);
  return parse;
};

export const parsePayloadOutgoingData = (arr: Meeting[], id: number) => {
  let parse = arr.filter((e) => e.type === NEW_LETTER_TYPE.OUT_GOING);
  return parse;
};

/*export const parseData = (data: Meeting[]) => {
  let indexed_nodes: any = {},
    tree_roots: any = [];
  for (let i = 0; i < data.length; i += 1) {
    indexed_nodes[data[i].id] = data[i];
  }
  for (let i = 0; i < data.length; i += 1) {
    let parent_id = data[i].reference_id;
    if (parent_id === null) {
      tree_roots.push(data[i]);
    } else if (parent_id !== null) {
      if (!indexed_nodes[parent_id].children)
        indexed_nodes[parent_id].children = [];
      indexed_nodes[parent_id].children.push(data[i]);
    }
  }

  return tree_roots;
};*/
