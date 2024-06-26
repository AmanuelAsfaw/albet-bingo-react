import { ApiCallState } from "../Utils";

export type Resource= {
  id: number;
};

export type ResourceStateTypes = {
  fetchAll: ApiCallState<Resource[]>;
  fetchOne: ApiCallState<Resource | {}>;
};

export const ResourceActionTypes = {
  FETCH_ALL_RESOURCE: "FETCH_ALL_RESOURCE",
  FETCH_ALL_RESOURCE_RESET: "FETCH_ALL_RESOURCE_RESET",
  FETCH_ALL_RESOURCE_FAILURE: "FETCH_ALL_RESOURCE_FAILURE",
  FETCH_ALL_RESOURCE_SUCCESS: "FETCH_ALL_RESOURCE_SUCCESS",

  FETCH_ONE_RESOURCE: "FETCH_ONE_RESOURCE",
  FETCH_ONE_RESOURCE_RESET: "FETCH_ONE_RESOURCE_RESET",
  FETCH_ONE_RESOURCE_FAILURE: "FETCH_ONE_RESOURCE_FAILURE",
  FETCH_ONE_RESOURCE_SUCCESS: "FETCH_ONE_RESOURCE_SUCCESS",
};
