import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { MeetingFile } from "../../../../../../redux/MeetingFile/MeetingFile.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ShareMeetingFile } from "../../../../../../redux/ShareMeetingFile/ShareMeetingFile.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type MeetingFilePropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchAllMeetingFile: Function;
  meeting_files: ApiCallState<MeetingFile[]>;
};

export type AddMeetingFilePropType = {
  fetchAllMeetingFile: Function;
  meeting_files: ApiCallState<MeetingFile[]>;
  project: ApiCallState<Project>;
};

export type ShareMeetingFilePropType = {
  meeting_file_id: number;
  project: Project;
  users: User[];
  share_meeting_files: ApiCallState<ShareMeetingFile[]>;
  fetchAllShareMeetingFile: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/meeting-file", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/meeting-file/${id}`);

export const sendShareData = (data: any) =>
  axios.post(`${API_BASE_URI}/share-meeting-file`, data);

export const deleteShareData = (id: number) =>
  axios.delete(`${API_BASE_URI}/share-meeting-file/${id}`);
