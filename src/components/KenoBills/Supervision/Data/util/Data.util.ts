import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Data } from "../../../../../redux/Data/Data.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ShareData } from "../../../../../redux/ShareData/ShareData.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type DataPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  data: ApiCallState<Data[]>;
  fetchAllData: Function;
};

export type AddDataPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchAllData: Function;
};

export type EditDataPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchAllData: Function;
  fetchOneData: Function;
  data: ApiCallState<Data>;
  id: number;
};

export type ShareDataPropType = {
  data_id: number;
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
  share_data: ApiCallState<ShareData[]>;
  fetchAllShareData: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/data", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/data/${id}`);

export const sendShareData = (data: any) =>
  axios.post(`${API_BASE_URI}/share-data`, data);

export const deleteShareData = (id: number) =>
  axios.delete(`${API_BASE_URI}/share-data/${id}`);
