import { ApiCallState } from "../Utils";

export type Consultant = {
  id: number | null;
  name: string;
  city: string;
  address: string;
  phone_number: string;
  email: string;
  type: string;
  general_manager: string;
  key: number | null;
};

export type ConsultantStateTypes = {
  fetchAll: ApiCallState<Consultant[]>;
};

export const ConsultantActionTypes = {
  FETCH_ALL_CONSULTANT: "FETCH_ALL_CONSULTANT",
  FETCH_ALL_CONSULTANT_RESET: "FETCH_ALL_CONSULTANT_RESET",
  FETCH_ALL_CONSULTANT_FAILURE: "FETCH_ALL_CONSULTANT_FAILURE",
  FETCH_ALL_CONSULTANT_SUCCESS: "FETCH_ALL_CONSULTANT_SUCCESS",
};
