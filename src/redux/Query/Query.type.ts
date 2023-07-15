import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Query= {
  id: number;
  project_id: number,
  response_from: number,
  requested_by: number,
  date: string,
  is_answered: boolean,
  needed_by_date: string,
  response_date:string,
  query_items:QueryItem[]
  query_response_from:User
  query_requested_by:User
};
export type QueryItem={
    id: number,
    query_id: number,
    date: string,
    message:string
    query_user:User
    user_id:number
}

export type QueryStateTypes = {
  fetchAll: ApiCallState<Query[]>;
  fetchOne: ApiCallState<Query | {}>;
};

export const QueryActionTypes = {
  FETCH_ALL_QUERY: "FETCH_ALL_QUERY",
  FETCH_ALL_QUERY_RESET: "FETCH_ALL_QUERY_RESET",
  FETCH_ALL_QUERY_FAILURE: "FETCH_ALL_QUERY_FAILURE",
  FETCH_ALL_QUERY_SUCCESS: "FETCH_ALL_QUERY_SUCCESS",

  FETCH_ONE_QUERY: "FETCH_ONE_QUERY",
  FETCH_ONE_QUERY_RESET: "FETCH_ONE_QUERY_RESET",
  FETCH_ONE_QUERY_FAILURE: "FETCH_ONE_QUERY_FAILURE",
  FETCH_ONE_QUERY_SUCCESS: "FETCH_ONE_QUERY_SUCCESS",
};
