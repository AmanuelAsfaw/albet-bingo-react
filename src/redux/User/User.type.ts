import { ApiCallState } from "../Utils";

export type User = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  company: Company;
  chat_id: string;
  signature: Signature | null;
  access_type: string[];
  last_seen: any;
  role: string;
  is_super_user: boolean;
  status: string;
};

export type Company = {
  id: number;
  name: string;
  type: string;
  category: string;
  address: string;
  country: string;
};

export type Signature = {
  id: number;
  signature_url: string;
};

export type UserStateTypes = {
  fetchAll: ApiCallState<User[]>;
  fetchOne: ApiCallState<User | {}>;
  fetchLoggedIn: ApiCallState<User | {}>;
  fetchFeature:ApiCallState<User|{}>;
};

export const UserActionTypes = {
  FETCH_ALL_USER: "FETCH_ALL_USER",
  FETCH_ALL_USER_RESET: "FETCH_ALL_USER_RESET",
  FETCH_ALL_USER_FAILURE: "FETCH_ALL_USER_FAILURE",
  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",

  FETCH_ONE_USER: "FETCH_ONE_USER",
  FETCH_ONE_USER_RESET: "FETCH_ONE_USER_RESET",
  FETCH_ONE_USER_FAILURE: "FETCH_ONE_USER_FAILURE",
  FETCH_ONE_USER_SUCCESS: "FETCH_ONE_USER_SUCCESS",

  FETCH_LOGGED_IN_USER: "FETCH_LOGGED_IN_USER",
  FETCH_LOGGED_IN_USER_RESET: "FETCH_LOGGED_IN_USER_RESET",
  FETCH_LOGGED_IN_USER_FAILURE: "FETCH_LOGGED_IN_USER_FAILURE",
  FETCH_LOGGED_IN_USER_SUCCESS: "FETCH_LOGGED_IN_USER_SUCCESS",

  FETCH_FEATURE_USER: "FETCH_FEATURE_USER",
  FETCH_FEATURE_USER_RESET: "FETCH_FEATURE_USER_RESET",
  FETCH_FEATURE_USER_FAILURE: "FETCH_FEATURE_USER_FAILURE",
  FETCH_FEATURE_USER_SUCCESS: "FETCH_FEATURE_USER_SUCCESS",
};
