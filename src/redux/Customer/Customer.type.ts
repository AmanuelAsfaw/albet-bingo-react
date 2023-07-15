import { ApiCallState } from "../Utils";

export type Customer = {
  id: number | null;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  role: string;
  contact_person: string;
  tin_number: string;
};

export type CustomerStateTypes = {
  fetchAll: ApiCallState<Customer[]>;
};

export const CustomerActionTypes = {
  FETCH_ALL_CUSTOMER: "FETCH_ALL_CUSTOMER",
  FETCH_ALL_CUSTOMER_RESET: "FETCH_ALL_CUSTOMER_RESET",
  FETCH_ALL_CUSTOMER_FAILURE: "FETCH_ALL_CUSTOMER_FAILURE",
  FETCH_ALL_CUSTOMER_SUCCESS: "FETCH_ALL_CUSTOMER_SUCCESS",
};
