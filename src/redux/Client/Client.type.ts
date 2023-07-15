import { ApiCallState } from "../Utils";

export type Client = {
  id: number | null;
  name: string;
  city: string;
  address: string;
  phone_number: string;
  email: string;
};

export type ClientStateTypes = {
  fetchAll: ApiCallState<Client[]>;
};

export const ClientActionTypes = {
  FETCH_ALL_CLIENT: "FETCH_ALL_CLIENT",
  FETCH_ALL_CLIENT_RESET: "FETCH_ALL_CLIENT_RESET",
  FETCH_ALL_CLIENT_FAILURE: "FETCH_ALL_CLIENT_FAILURE",
  FETCH_ALL_CLIENT_SUCCESS: "FETCH_ALL_CLIENT_SUCCESS",
};
