import { ApiCallState } from "../Utils";

export type Service = {
  id: number;
  name: string;
};

export type ServiceStateTypes = {
  fetchAll: ApiCallState<Service[]>;
};

export const ServiceActionTypes = {
  FETCH_ALL_SERVICE: "FETCH_ALL_SERVICE",
  FETCH_ALL_SERVICE_RESET: "FETCH_ALL_SERVICE_RESET",
  FETCH_ALL_SERVICE_FAILURE: "FETCH_ALL_SERVICE_FAILURE",
  FETCH_ALL_SERVICE_SUCCESS: "FETCH_ALL_SERVICE_SUCCESS",
};
