import { ApiCallState } from "../Utils";

export type Contractor = {
  id: number | null;
  name: string;
  city: string;
  address: string;
  phone_number: string;
  email: string;
  type: string;
  general_manager: string;
};

export type ContractorStateTypes = {
  fetchAll: ApiCallState<Contractor[]>;
};

export const ContractorActionTypes = {
  FETCH_ALL_CONTRACTOR: "FETCH_ALL_CONTRACTOR",
  FETCH_ALL_CONTRACTOR_RESET: "FETCH_ALL_CONTRACTOR_RESET",
  FETCH_ALL_CONTRACTOR_FAILURE: "FETCH_ALL_CONTRACTOR_FAILURE",
  FETCH_ALL_CONTRACTOR_SUCCESS: "FETCH_ALL_CONTRACTOR_SUCCESS",
};
