import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type ExternalDocument= {
    id: number | null;
    project_id:number;
    date:string;
    description:string;
    type: string;
    user_id:string;
    expiry_date:string;
    document:Document;
    external_document_statuses:ExternalDocumentStatusTypes[];

};

export type ExternalDocumentStatusTypes = {
  external_document_id: number;
  type: "View" | "Check" | "Approve";
  status: number;
  assigned_by: number;
  user_id: number;
  id: number;
};


export type ExternalDocumentStateTypes = {
  fetchAll: ApiCallState<ExternalDocument[]>;
  fetchOne: ApiCallState<ExternalDocument | {}>;
};

export const ExternalDocumentActionTypes = {
  FETCH_ALL_EXTERNAL_DOCUMENT: "FETCH_ALL_EXTERNAL_DOCUMENT",
  FETCH_ALL_EXTERNAL_DOCUMENT_RESET: "FETCH_ALL_EXTERNAL_DOCUMENT_RESET",
  FETCH_ALL_EXTERNAL_DOCUMENT_FAILURE: "FETCH_ALL_EXTERNAL_DOCUMENT_FAILURE",
  FETCH_ALL_EXTERNAL_DOCUMENT_SUCCESS: "FETCH_ALL_EXTERNAL_DOCUMENT_SUCCESS",

  FETCH_ONE_EXTERNAL_DOCUMENT: "FETCH_ONE_EXTERNAL_DOCUMENT",
  FETCH_ONE_EXTERNAL_DOCUMENT_RESET: "FETCH_ONE_EXTERNAL_DOCUMENT_RESET",
  FETCH_ONE_EXTERNAL_DOCUMENT_FAILURE: "FETCH_ONE_EXTERNAL_DOCUMENT_FAILURE",
  FETCH_ONE_EXTERNAL_DOCUMENT_SUCCESS: "FETCH_ONE_EXTERNAL_DOCUMENT_SUCCESS",
};
