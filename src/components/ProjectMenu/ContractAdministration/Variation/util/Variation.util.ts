import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { Variation } from "../../../../../redux/Variation/Variation.type";

export type VariationPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  variation: ApiCallState<Variation[]>;
  fetchVariation: Function;
};

export type AddVariationPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchVariation: Function;
};

export type StatusPropType = {
  expiry_date: string;
};

export type ShareVariationPropType = {
  fetchVariation: Function;
  fetchAllUser: Function;
  users: ApiCallState<User[]>;
  variation: Variation;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/variation", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/variation/${id}`);


  export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/variation-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/variation-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/variation-status", data);
