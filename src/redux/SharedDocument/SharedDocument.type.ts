import { Document } from "../Document/Document.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type SharedDocument = {
  id: number;
  user_id: number;
  document_id: number;
  shared_by_id: number;

  user: User;
  shared_by: User;
  document: Document;
};

export type SharedDocumentStateTypes = {
  fetchAll: ApiCallState<SharedDocument[]>;
};

export const SharedDocumentActionTypes = {
  FETCH_ALL_SHARED_DOCUMENT: "FETCH_ALL_SHARED_DOCUMENT",
  FETCH_ALL_SHARED_DOCUMENT_RESET: "FETCH_ALL_SHARED_DOCUMENT_RESET",
  FETCH_ALL_SHARED_DOCUMENT_FAILURE: "FETCH_ALL_SHARED_DOCUMENT_FAILURE",
  FETCH_ALL_SHARED_DOCUMENT_SUCCESS: "FETCH_ALL_SHARED_DOCUMENT_SUCCESS",
};
