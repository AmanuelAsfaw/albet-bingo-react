import { Query } from "../../../../../redux/Query/Query.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { User } from "../../../../../redux/User/User.type";
import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
export type QueryPropType = {
  fetchQuery: Function;
  fetchUsers: Function;
  fetchUser: Function;
  project: ApiCallState<Project>;
  query: ApiCallState<Query[]>;
};

export type AddQueryPropType = {
  query: ApiCallState<Query[]>;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  user: ApiCallState<User>;
  fetchQuery: Function;
};

export type DetailQueryPropType = {
  query: ApiCallState<Query>;
  id: number;
  fetchQuery: Function;
  fetchQueries: Function;
  user: ApiCallState<User>;
  project: ApiCallState<Project>;
  record: Query;
};

export type StatusPropType = {
  query: Query;
};

export const sendQuery = (data: any) =>
  axios.post(API_BASE_URI + "/query", data);

export const sendQueryItem = (data: any) =>
  axios.post(API_BASE_URI + "/query_item", data);
