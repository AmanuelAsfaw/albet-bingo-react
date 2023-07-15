import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { ContractAdminstration } from "../../../../../redux/ContractAdminstration/ContractAdminstration.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type ContractAdminstrationPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  contract_adminstration: ApiCallState<ContractAdminstration[]>;
  fetchAllContractAdminstration: Function;
};

export type AddContractAdminstrationPropType = {
  project: ApiCallState<Project>;
  fetchUser: Function;
  users: ApiCallState<User[]>;
  fetchAllContractAdminstration: Function;
};

export type StatusPropType = {
  expiry_date: string;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/contract-adminstration", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/contract-adminstration/${id}`);