import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { Client } from "../../../../redux/Client/Client.type";
import { Consultant } from "../../../../redux/Consultant/Consultant.type";
import { Contractor } from "../../../../redux/Contractor/Contractor.type";
import { Project } from "../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../redux/Utils";

export type DetailPropType = {};

export type ProjectPropType = {
  fetchProject: Function;
  project: ApiCallState<Project>;
};

export type ContractorPropType = {
  fetchProject: Function;
  fetchContractors: Function;
  contractors: ApiCallState<Contractor[]>;
  project: ApiCallState<Project>;
};

export type ConsultantPropType = {
  fetchProject: Function;
  fetchConsultants: Function;
  consultants: ApiCallState<Consultant[]>;
  project: ApiCallState<Project>;
};

export type ClientPropType = {
  fetchProject: Function;
  fetchClients: Function;
  clients: ApiCallState<Client[]>;
  project: ApiCallState<Project>;
};

export type PaymentPropType = {
  fetchProject: Function;
  project: ApiCallState<Project>;
};

export const editData = (data: any) =>
  axios.put(API_BASE_URI + "/project", data);
