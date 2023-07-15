import { Project } from "../Project/Project.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Document = {
  id: number;
  reference_number: string;
  name: string;
  type: string;
  date: string;
  url: string;
  size: number;
  project: Project;
  is_private: boolean;
  user_id: number;
  user: User;
  shared_users: number[];
};

export type DocumentStateTypes = {
  fetchAll: ApiCallState<Document[]>;
};

export const DocumentActionTypes = {
  FETCH_ALL_DOCUMENT: "FETCH_ALL_DOCUMENT",
  FETCH_ALL_DOCUMENT_RESET: "FETCH_ALL_DOCUMENT_RESET",
  FETCH_ALL_DOCUMENT_FAILURE: "FETCH_ALL_DOCUMENT_FAILURE",
  FETCH_ALL_DOCUMENT_SUCCESS: "FETCH_ALL_DOCUMENT_SUCCESS",

  SET_DOCUMENT: "SET_DOCUMENT",
};
