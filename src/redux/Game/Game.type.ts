import { Contractor } from "../Contractor/Contractor.type";
import { Consultant } from "../Consultant/Consultant.type";
import { ApiCallState } from "../Utils";
import { Boq } from "../Boq/Boq.type";
import { Client } from "../Client/Client.type";
import { PaymentFile } from "../PaymentFile/PaymentFile.type";
import { User } from "../User/User.type";
import { Role } from "../Role/Role.type";
export type Game = {
  id: any;
  name: string;
  type: string;
  game_no: string;
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

export type GameStateTypes = {
  fetchList: ApiCallState<Game[]>;
  fetchAll: ApiCallState<Game[]>;
  fetchOne: ApiCallState<Game | null>;
};

export const GameActionTypes = {
  FETCH_ALL_GAME: "FETCH_ALL_GAME",
  FETCH_ALL_GAME_RESET: "FETCH_ALL_GAME_RESET",
  FETCH_ALL_GAME_FAILURE: "FETCH_ALL_GAME_FAILURE",
  FETCH_ALL_GAME_SUCCESS: "FETCH_ALL_GAME_SUCCESS",

  FETCH_ALL_GAME_LIST: "FETCH_ALL_GAME_LIST",
  FETCH_ALL_GAME_LIST_RESET: "FETCH_ALL_GAME_LIST_RESET",
  FETCH_ALL_GAME_LIST_FAILURE: "FETCH_ALL_GAME_LIST_FAILURE",
  FETCH_ALL_GAME_LIST_SUCCESS: "FETCH_ALL_GAME_LIST_SUCCESS",

  FETCH_ONE_GAME: "FETCH_ONE_GAME",
  FETCH_ONE_GAME_RESET: "FETCH_ONE_GAME_RESET",
  FETCH_ONE_GAME_FAILURE: "FETCH_ONE_GAME_FAILURE",
  FETCH_ONE_GAME_SUCCESS: "FETCH_ONE_GAME_SUCCESS",

  FETCH_ALL_PRE_GAME: "FETCH_ALL_PRE_GAME",
  FETCH_ALL_PRE_GAME_RESET: "FETCH_ALL_PRE_GAME_RESET",
  FETCH_ALL_PRE_GAME_FAILURE: "FETCH_ALL_PRE_GAME_FAILURE",
  FETCH_ALL_PRE_GAME_SUCCESS: "FETCH_ALL_PRE_GAME_SUCCESS",

  FETCH_ONE_PRE_GAME: "FETCH_ONE_PRE_GAME",
  FETCH_ONE_PRE_GAME_RESET: "FETCH_ONE_PRE_GAME_RESET",
  FETCH_ONE_PRE_GAME_FAILURE: "FETCH_ONE_PRE_GAME_FAILURE",
  FETCH_ONE_PRE_GAME_SUCCESS: "FETCH_ONE_PRE_GAME_SUCCESS",
};
