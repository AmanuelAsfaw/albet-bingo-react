import { Contractor } from "../Contractor/Contractor.type";
import { Consultant } from "../Consultant/Consultant.type";
import { ApiCallState } from "../Utils";
import { Boq } from "../Boq/Boq.type";
import { Client } from "../Client/Client.type";
import { PaymentFile } from "../PaymentFile/PaymentFile.type";
import { User } from "../User/User.type";
import { Role } from "../Role/Role.type";
export type Project = {
  id: any;
  name: string;
  type: string;
  project_no: string;
  project_type: "sub-contract" | "pre-contract" | "post-contract";
  basement_size: number;
  floor_size: number;
  road_size: number;
  country: string;
  region: string;
  address: string;
  contract_no:string;
  manager_name: string;
  budget: number;
  location: string;
  commencement_date?: any;
  completion_date?: any;
  status: number;
  road_interval: number | null;
  custom_size: string;
  project_start: string;
  project_end: string;
  contract_type?: string;
  client?: Client;
  boqs: Boq[];
  overall: Overall;
  contractor?: Contractor;
  consultant?: Consultant;
  project_payment: ProjectPayment;
  // payment_certificates: PaymentCertificate[];
  payment_files: PaymentFile[];
  sub_contract_project?: Project;
  demo?: boolean;
  project_id: any;
  user_controls: UserControlTypes[];
  user_id: number;
};

export type Store = {
  id: number;
  name: string;
};

export type Overall = {
  project_id: number | null;
  planned: number;
  contract_amount: number;
  performed: number;
  payment_waiting: number;
  paid: number;
  expense: number;
  profit: number;
  variation: number;
  material_expense: number;
  labour_expense: number;
  supply_fix_expense: number;
  equipment_expense: number;
  fuel_expense: number;
  supply_expense: number;
  sub_contract_labour: number;
  current_performance: number;
};

export type ProjectPayment = {
  project_id: number | null;
  advance_payment: number;
  rebate: number;
  retention: number;
  material_in_site: number;
  penalty: number;
  advance_percent: number;
  price_adjustment: number;
  price_escalation: number;
  overhead: number;
  retention_date: Date;
};

export type PaymentCertificate = {
  id: any;
  project_id: number | null;
  amount: number;
  repayment: number;
  approved: number;
  requested_date: any;
  response_date: any;
  updated: number | null;
  document_id: number | null;
  retention: number;
  rebate: number;
};

export type Variation = {
  key: number;
  id: number;
  boq_id: number;
  quantity: number;
};

export type UserControlTypes = {
  id: number;
  user_id: number;
  role_id: number;
  role: Role;
  access_type: string;
  createdAt: string;
  user: User;
};

export type ProjectStateTypes = {
  fetchList: ApiCallState<Project[]>;
  fetchAll: ApiCallState<Project[]>;
  fetchOne: ApiCallState<Project | null>;
  fetchAllPreContract: ApiCallState<Project[]>;
  fetchOnePreContract: ApiCallState<Project | null>;
};

export const ProjectActionTypes = {
  FETCH_ALL_PROJECT: "FETCH_ALL_PROJECT",
  FETCH_ALL_PROJECT_RESET: "FETCH_ALL_PROJECT_RESET",
  FETCH_ALL_PROJECT_FAILURE: "FETCH_ALL_PROJECT_FAILURE",
  FETCH_ALL_PROJECT_SUCCESS: "FETCH_ALL_PROJECT_SUCCESS",

  FETCH_ALL_PROJECT_LIST: "FETCH_ALL_PROJECT_LIST",
  FETCH_ALL_PROJECT_LIST_RESET: "FETCH_ALL_PROJECT_LIST_RESET",
  FETCH_ALL_PROJECT_LIST_FAILURE: "FETCH_ALL_PROJECT_LIST_FAILURE",
  FETCH_ALL_PROJECT_LIST_SUCCESS: "FETCH_ALL_PROJECT_LIST_SUCCESS",

  FETCH_ONE_PROJECT: "FETCH_ONE_PROJECT",
  FETCH_ONE_PROJECT_RESET: "FETCH_ONE_PROJECT_RESET",
  FETCH_ONE_PROJECT_FAILURE: "FETCH_ONE_PROJECT_FAILURE",
  FETCH_ONE_PROJECT_SUCCESS: "FETCH_ONE_PROJECT_SUCCESS",

  FETCH_ALL_PRE_PROJECT: "FETCH_ALL_PRE_PROJECT",
  FETCH_ALL_PRE_PROJECT_RESET: "FETCH_ALL_PRE_PROJECT_RESET",
  FETCH_ALL_PRE_PROJECT_FAILURE: "FETCH_ALL_PRE_PROJECT_FAILURE",
  FETCH_ALL_PRE_PROJECT_SUCCESS: "FETCH_ALL_PRE_PROJECT_SUCCESS",

  FETCH_ONE_PRE_PROJECT: "FETCH_ONE_PRE_PROJECT",
  FETCH_ONE_PRE_PROJECT_RESET: "FETCH_ONE_PRE_PROJECT_RESET",
  FETCH_ONE_PRE_PROJECT_FAILURE: "FETCH_ONE_PRE_PROJECT_FAILURE",
  FETCH_ONE_PRE_PROJECT_SUCCESS: "FETCH_ONE_PRE_PROJECT_SUCCESS",
};
